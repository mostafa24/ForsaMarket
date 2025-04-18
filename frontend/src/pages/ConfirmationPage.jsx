import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSave } from "react-icons/fa";




export default function ConfirmationPage() {
  const [orders, setOrders] = useState([]);
  const [editedOrders, setEditedOrders] = useState({});

  useEffect(() => {
    fetchPendingOrders();
  }, []);


  


  const fetchPendingOrders = async () => {
    try {
      const res = await axiosClient.get('/orders/pending')
      const pending = res.data.filter(
        (order) => order.confirmationStatus === "Pending"
      );
      setOrders(pending);
    } catch (err) {
      toast.error("خطأ في جلب الطلبات");
    }
  };

  const handleEdit = (id, field, value) => {
    setEditedOrders((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleConfirm = async (id) => {
    const edited = editedOrders[id];
    if (!edited) return;
    try {
      await axiosClient.put(`/orders/${id}`, {
        ...edited,
        confirmationStatus: edited.confirmationStatus || "Confirmée",
      });
      toast.success("تم تأكيد الطلب");
      fetchPendingOrders();
    } catch (err) {
      toast.error("خطأ في تحديث الطلب");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">تأكيد الطلبات</h2>

      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">الزبون</th>
              <th className="px-4 py-2">الهاتف</th>
              <th className="px-4 py-2">المدينة</th>
              <th className="px-4 py-2">العنوان</th>
              <th className="px-4 py-2">المنتج</th>
              <th className="px-4 py-2">Qté</th>
              <th className="px-4 py-2">Prix</th>
              <th className="px-4 py-2">حالة</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => {
              const edited = editedOrders[order.id] || {};
              return (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{order.orderNumber}</td>
                  <td className="px-4 py-2">{order.customerName}</td>
                  <td className="px-4 py-2">{order.phone}</td>
                  <td className="px-4 py-2">
                    <input
                      defaultValue={order.city}
                      onChange={(e) =>
                        handleEdit(order.id, "city", e.target.value)
                      }
                      className="border px-2 py-1 rounded"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      defaultValue={order.address}
                      onChange={(e) =>
                        handleEdit(order.id, "address", e.target.value)
                      }
                      className="border px-2 py-1 rounded"
                    />
                  </td>
                  <td className="px-4 py-2">{order.productName}</td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      defaultValue={order.quantity}
                      onChange={(e) =>
                        handleEdit(order.id, "quantity", e.target.value)
                      }
                      className="border px-2 py-1 rounded w-16"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      defaultValue={order.price}
                      onChange={(e) =>
                        handleEdit(order.id, "price", e.target.value)
                      }
                      className="border px-2 py-1 rounded w-20"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <select
                      defaultValue={order.confirmationStatus}
                      onChange={(e) =>
                        handleEdit(
                          order.id,
                          "confirmationStatus",
                          e.target.value
                        )
                      }
                      className="border px-2 py-1 rounded"
                    >
                      <option value="Confirmée">Confirmée</option>
                      <option value="Annulée">Annulée</option>
                      <option value="Non Répondu">Non Répondu</option>
                    </select>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleConfirm(order.id)}
                      className="text-green-600 hover:text-green-800"
                    >
                      <FaSave />
                    </button>
                  </td>
                </tr>
              );
            })}
            {orders.length === 0 && (
              <tr>
                <td
                  colSpan="10"
                  className="text-center text-gray-500 py-4"
                >
                  Aucun commande en attente.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
    </div>
  );
}