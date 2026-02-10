import React, { useState, useEffect } from 'react';
import { adminApi } from '../api';
import Navbar from './components/Navbar';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    adminApi.getOrders().then(({ data }) => setOrders(data)).catch(() => []);
  }, []);

  const handleStatus = async (id, status) => {
    try {
      await adminApi.updateOrderStatus(id, status);
      const { data } = await adminApi.getOrders();
      setOrders(data);
    } catch (e) {
      alert(e.response?.data?.message || 'Update failed');
    }
  };

  return (
    <div className="min-h-screen bg-eco-light">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-eco-dark mb-6">Manage Orders</h1>
        <div className="space-y-4">
          {orders.map((o) => (
            <div key={o._id} className="bg-white rounded-xl shadow p-6">
              <div className="flex justify-between items-start flex-wrap gap-4">
                <div>
                  <p className="font-semibold">{o.userId?.name} ({o.userId?.email})</p>
                  <p className="text-sm text-gray-600">{new Date(o.createdAt).toLocaleString()}</p>
                  <ul className="mt-2 text-sm">
                    {o.products.map((item, i) => (
                      <li key={i}>{item.name} x{item.quantity} - ₹{item.price * item.quantity}</li>
                    ))}
                  </ul>
                  <p className="font-bold mt-2">Total: ₹{o.totalPrice}</p>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={o.status}
                    onChange={(e) => handleStatus(o._id, e.target.value)}
                    className="border rounded px-3 py-1"
                  >
                    <option value="pending">pending</option>
                    <option value="confirmed">confirmed</option>
                    <option value="shipped">shipped</option>
                    <option value="delivered">delivered</option>
                    <option value="cancelled">cancelled</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
          {orders.length === 0 && <p className="text-gray-600 py-8">No orders</p>}
        </div>
      </main>
    </div>
  );
}
