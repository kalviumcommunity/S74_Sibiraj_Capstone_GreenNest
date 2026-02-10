import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminApi } from '../api';
import Navbar from './components/Navbar';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    adminApi.getAnalytics()
      .then(({ data }) => setStats(data))
      .catch(() => setStats(null));
  }, []);

  return (
    <div className="min-h-screen bg-eco-light">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-eco-dark mb-6">Admin Dashboard</h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats && (
            <>
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-gray-600">Users</h3>
                <p className="text-2xl font-bold text-eco-dark">{stats.userCount}</p>
                <Link to="/admin/users" className="text-eco-green text-sm mt-2 inline-block">Manage</Link>
              </div>
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-gray-600">Products</h3>
                <p className="text-2xl font-bold text-eco-dark">{stats.productCount}</p>
                <Link to="/admin/products" className="text-eco-green text-sm mt-2 inline-block">Manage</Link>
              </div>
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-gray-600">Orders</h3>
                <p className="text-2xl font-bold text-eco-dark">{stats.orderCount}</p>
                <Link to="/admin/orders" className="text-eco-green text-sm mt-2 inline-block">Manage</Link>
              </div>
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-gray-600">Revenue</h3>
                <p className="text-2xl font-bold text-eco-green">₹{stats.revenue || 0}</p>
              </div>
            </>
          )}
        </div>

        <div className="flex flex-wrap gap-4">
          <Link to="/admin/products" className="px-6 py-3 bg-eco-green text-white rounded-lg hover:bg-eco-dark">
            Manage Products
          </Link>
          <Link to="/admin/users" className="px-6 py-3 bg-eco-green text-white rounded-lg hover:bg-eco-dark">
            Manage Users
          </Link>
          <Link to="/admin/orders" className="px-6 py-3 bg-eco-green text-white rounded-lg hover:bg-eco-dark">
            Manage Orders
          </Link>
          <Link to="/admin/services" className="px-6 py-3 bg-eco-green text-white rounded-lg hover:bg-eco-dark">
            Manage Services
          </Link>
          <Link to="/admin/bookings" className="px-6 py-3 bg-eco-green text-white rounded-lg hover:bg-eco-dark">
            Manage Bookings
          </Link>
        </div>
      </main>
    </div>
  );
}
