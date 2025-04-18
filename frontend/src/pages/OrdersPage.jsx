import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { FaEdit, FaSave } from 'react-icons/fa';

const initialOrders = [];

export default function OrdersPage() {
  const [orders, setOrders] = useState(initialOrders);
  const [search, setSearch] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedOrder, setEditedOrder] = useState({});

  // 🔍 الفلترة النهائية
  const filteredOrders = orders.filter((order) =>
    (order.customer.toLowerCase().includes(search.toLowerCase()) ||
      order.phone.includes(search)) &&
    (cityFilter === '' || order.city === cityFilter) &&
    (statusFilter === '' || order.status === statusFilter)
  );

  // 📥 إدخال ملف CSV/Excel
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const workbook = XLSX.read(bstr, { type: 'binary' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(sheet);
      setOrders(data);
    };
    reader.readAsBinaryString(file);
  };

  // ✏️ بدء التعديل
  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditedOrder({ ...orders[index] });
  };

  // 💾 حفظ التعديلات
  const handleSave = () => {
    const updated = [...orders];
    updated[editingIndex] = editedOrder;
    setOrders(updated);
    setEditingIndex(null);
    setEditedOrder({});
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Gestion des commandes</h2>

      {/* ✅ فلترة و بحث */}
      <div className="flex flex-wrap gap-4 items-center mb-6">
        <input
          type="text"
          placeholder="Recherche..."
          className="border px-4 py-2 rounded w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          className="border px-4 py-2 rounded"
        >
          <option value="">Toutes les villes</option>
          {[...new Set(orders.map((o) => o.city))].map((city, idx) => (
            <option key={idx} value={city}>{city}</option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-4 py-2 rounded"
        >
          <option value="">Tous statuts</option>
          <option value="Confirmé">Confirmé</option>
          <option value="En attente">En attente</option>
          <option value="Annulé">Annulé</option>
        </select>
      </div>

      {/* ✅ Tableau */}
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
            {filteredOrders.map((order, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{order.numero}</td>
                <td className="px-4 py-2">
                  {editingIndex === index ? (
                    <input
                      value={editedOrder.customer}
                      onChange={(e) =>
                        setEditedOrder({ ...editedOrder, customer: e.target.value })
                      }
                      className="border px-2 py-1 rounded w-full"
                    />
                  ) : (
                    order.customer
                  )}
                </td>
                <td className="px-4 py-2">{order.phone}</td>
                <td className="px-4 py-2">{order.city}</td>
                <td className="px-4 py-2">{order.product}</td>
                <td className="px-4 py-2">{order.quantity}</td>
                <td className="px-4 py-2">{order.price}</td>
                <td className="px-4 py-2">{order.status}</td>
                <td className="px-4 py-2">
                  {editingIndex === index ? (
                    <button
                      className="text-green-600"
                      onClick={handleSave}
                      title="Save"
                    >
                      <FaSave />
                    </button>
                  ) : (
                    <button
                      className="text-blue-600"
                      onClick={() => handleEdit(index)}
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan="9" className="px-4 py-4 text-center text-gray-500">
                  Aucune commande trouvée
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Upload Excel */}
      <div className="mt-6">
        <h3 className="font-semibold mb-2">Importer CSV</h3>
        <input
          type="file"
          accept=".xlsx, .csv"
          onChange={handleFileUpload}
          className="border px-4 py-2 rounded"
        />
      </div>
    </div>
  );
}
