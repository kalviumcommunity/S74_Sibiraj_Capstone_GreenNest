import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userApi, trackerApi, ordersApi } from '../api';
import Navbar from './components/Navbar';

export default function Dashboard() {
  const [points, setPoints] = useState(0);
  const [plants, setPlants] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    userApi.getPoints().then(({ data }) => setPoints(data.ecoPoints)).catch(() => {});
    trackerApi.getMyPlants().then(({ data }) => setPlants(data)).catch(() => []);
    ordersApi.getMy().then(({ data }) => setOrders(data)).catch(() => []);
  }, []);

  return (
    <div className="min-h-screen bg-eco-light">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-eco-dark mb-6">Dashboard</h1>

        <div className="grid sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-gray-600">Eco Points</h3>
            <p className="text-2xl font-bold text-eco-green">{points}</p>
            <Link to="/rewards" className="text-eco-green text-sm mt-2 inline-block">View rewards</Link>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-gray-600">Plants Tracked</h3>
            <p className="text-2xl font-bold text-eco-dark">{plants.length}</p>
            <Link to="/tracker" className="text-eco-green text-sm mt-2 inline-block">Track plants</Link>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-gray-600">Orders</h3>
            <p className="text-2xl font-bold text-eco-dark">{orders.length}</p>
            <Link to="/orders" className="text-eco-green text-sm mt-2 inline-block">View orders</Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold text-eco-dark mb-4">Recent Plants</h2>
            {plants.length === 0 ? (
              <p className="text-gray-600">No plants yet. <Link to="/products" className="text-eco-green">Browse seeds</Link></p>
            ) : (
              <ul className="space-y-2">
                {plants.slice(0, 5).map((p) => (
                  <li key={p._id} className="flex justify-between">
                    <span>{p.seedName}</span>
                    <span className="text-eco-green">{p.growthStage}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold text-eco-dark mb-4">Recent Orders</h2>
            {orders.length === 0 ? (
              <p className="text-gray-600">No orders yet</p>
            ) : (
              <ul className="space-y-2">
                {orders.slice(0, 5).map((o) => (
                  <li key={o._id} className="flex justify-between">
                    <span>₹{o.totalPrice}</span>
                    <span className="text-eco-green">{o.status}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
