import React, { useState, useEffect } from 'react';
import { ordersApi } from '../api';
import Navbar from './components/Navbar';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ordersApi.getMy()
      .then(({ data }) => setOrders(data))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-eco-light">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-eco-dark mb-6">My Orders</h1>

        {loading && <p>Loading...</p>}
        <div className="space-y-4">
          {orders.map((o) => (
            <div key={o._id} className="bg-white rounded-xl shadow p-6">
              <div className="flex justify-between items-center flex-wrap gap-2 mb-4">
                <span className="font-semibold">Order #{o._id.slice(-6)}</span>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  o.status === 'delivered' ? 'bg-green-100 text-green-800' :
                  o.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {o.status}
                </span>
              </div>
              <p className="text-sm text-gray-600">{new Date(o.createdAt).toLocaleString()}</p>
              <ul className="mt-2 space-y-1">
                {o.products.map((item, i) => (
                  <li key={i}>{item.name} x{item.quantity} - ₹{item.price * item.quantity}</li>
                ))}
              </ul>
              <p className="mt-2 font-bold text-eco-dark">Total: ₹{o.totalPrice}</p>
            </div>
          ))}
          {!loading && orders.length === 0 && (
            <p className="text-center text-gray-600 py-12">No orders yet</p>
          )}
        </div>
      </main>
    </div>
  );
}
