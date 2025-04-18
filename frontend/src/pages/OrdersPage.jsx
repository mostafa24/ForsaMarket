import React, { useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';
import { FaEdit, FaSave } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as XLSX from 'xlsx';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [editedOrders, setEditedOrders] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axiosClient.get('/orders');
      setOrders(res.data);
    } catch (err) {
      toast.error('Erreur lors du chargement des commandes');
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = async (evt) => {
      const bstr = evt.target.result;
      const workbook = XLSX.read(bstr, { type: 'binary' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(sheet);

      for (let d of data) {
        await axiosClient.post('/orders', {
          orderNumber: d.orderNumber || `CMD-${Date.now()}`,
          orderDate: new Date(),
          customerName: d.customerName,
          phone: d.phone,
          city: d.city,
          address: d.address || '',
          productName: d.productName,
          quantity: d.quantity,
          price: d.price,
          confirmationStatus: d.confirmationStatus || 'Pending',
          deliveryStatus: 'Pending',
          notes: d.notes || ''
        });
      }
      fetchOrders();
      toast.success('Importation réussie');
    };
    reader.readAsBinaryString(file);
  };

  const handleEditChange = (id, key, value) => {
    setEditedOrders((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [key]: value,
      },
    }));
  };

  const handleSave = async (id) => {
    try {
      const updated = editedOrders[id];
      await axiosClient.put(`/orders/${id}`, updated);
      toast.success('Commande mise à jour');
      fetchOrders();
      setEditedOrders((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    } catch (err) {
      toast.error("Échec de l'enregistrement");
    }
  };

  const handleSaveAll = async () => {
    const updates = Object.entries(editedOrders);
    try {
      for (let [id, data] of updates) {
        await axiosClient.put(`/orders/${id}`, data);
      }
      toast.success('Toutes les modifications sont enregistrées');
      setEditedOrders({});
      fetchOrders();
    } catch (err) {
      toast.error("Une erreur s'est produite lors de l'enregistrement groupé");
    }
  };

  const filteredOrders = orders.filter(
    (o) =>
      (o.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.phone?.includes(searchQuery)) &&
      (cityFilter === '' || o.city === cityFilter) &&
      (statusFilter === '' || o.confirmationStatus === statusFilter)
  );

  const start = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(start, start + itemsPerPage);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  return (
    <div className="p-6">
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar newestOnTop />

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Gestion des commandes</h2>
        <button
          onClick={handleSaveAll}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          💾 Sauvegarder tout
        </button>
      </div>

      <div className="flex gap-4 mb-4 items-center flex-wrap">
        <input
          type="text"
          className="border px-3 py-2 rounded w-64"
          placeholder="Recherche..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="border px-3 py-2 rounded"
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
        >
          <option value="">Toutes les villes</option>
          {[...new Set(orders.map((o) => o.city))].map((city, i) => (
            <option key={i} value={city}>{city}</option>
          ))}
        </select>
        <select
          className="border px-3 py-2 rounded"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Tous statuts</option>
          <option value="Pending">En attente</option>
          <option value="Confirmed">Confirmé</option>
          <option value="Cancelled">Annulé</option>
        </select>



        
        <input
          type="file"
          accept=".xlsx, .csv"
          onChange={handleFileUpload}
          className="border px-3 py-2 rounded"
        />
        <select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
          className="border px-3 py-2 rounded"
        >
          {[5, 10, 20, 50].map((n) => (
            <option key={n} value={n}>{n} / page</option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase">
            <tr>
              <th className="px-4 py-2">Numéro</th>
              <th className="px-4 py-2">Client</th>
              <th className="px-4 py-2">Téléphone</th>
              <th className="px-4 py-2">Ville</th>
              <th className="px-4 py-2">Produit</th>
              <th className="px-4 py-2">Qté</th>
              <th className="px-4 py-2">Prix</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{order.orderNumber}</td>
                <td className="px-4 py-2">
                  <input
                    value={editedOrders[order.id]?.customerName || order.customerName}
                    onChange={(e) => handleEditChange(order.id, 'customerName', e.target.value)}
                    className="border px-2 py-1 rounded w-full"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    value={editedOrders[order.id]?.phone || order.phone}
                    onChange={(e) => handleEditChange(order.id, 'phone', e.target.value)}
                    className="border px-2 py-1 rounded w-full"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    value={editedOrders[order.id]?.city || order.city}
                    onChange={(e) => handleEditChange(order.id, 'city', e.target.value)}
                    className="border px-2 py-1 rounded w-full"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    value={editedOrders[order.id]?.productName || order.productName}
                    onChange={(e) => handleEditChange(order.id, 'productName', e.target.value)}
                    className="border px-2 py-1 rounded w-full"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    value={editedOrders[order.id]?.quantity || order.quantity}
                    onChange={(e) => handleEditChange(order.id, 'quantity', parseInt(e.target.value))}
                    className="border px-2 py-1 rounded w-full"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    value={editedOrders[order.id]?.price || order.price}
                    onChange={(e) => handleEditChange(order.id, 'price', parseFloat(e.target.value))}
                    className="border px-2 py-1 rounded w-full"
                  />
                </td>
                <td className="px-4 py-2">
                  <select
                    value={editedOrders[order.id]?.confirmationStatus || order.confirmationStatus}
                    onChange={(e) => handleEditChange(order.id, 'confirmationStatus', e.target.value)}
                    className="border px-2 py-1 rounded w-full"
                  >
                    <option value="Pending">En attente</option>
                    <option value="Confirmed">Confirmé</option>
                    <option value="Cancelled">Annulé</option>
                  </select>
                </td>
                <td className="px-4 py-2 text-center">
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => handleSave(order.id)}
                  >
                    <FaSave />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Pagination */}
      <div className="flex justify-between mt-4 items-center">
        <div>
          Page {currentPage} / {totalPages}
        </div>
        <div className="space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            className="px-3 py-1 bg-gray-200 rounded"
            disabled={currentPage === 1}
          >
            ⬅️ Précédent
          </button>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            className="px-3 py-1 bg-gray-200 rounded"
            disabled={currentPage === totalPages}
          >
            Suivant ➡️
          </button>
        </div>
      </div>
    </div>
  );
}

