import React, { useState, useEffect } from 'react';
import { adminApi } from '../api';
import Navbar from './components/Navbar';

const STATUS_STYLES = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
};

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    adminApi.getBookings().then(({ data }) => setBookings(data)).catch(() => []);
  }, []);

  const handleStatus = async (id, status) => {
    try {
      await adminApi.updateBookingStatus(id, status);
      const { data } = await adminApi.getBookings();
      setBookings(data);
    } catch (e) {
      alert(e.response?.data?.message || 'Update failed');
    }
  };

  return (
    <div className="min-h-screen bg-eco-light">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-eco-dark mb-6">Manage Bookings</h1>
        <div className="space-y-4">
          {bookings.map((b) => (
            <div key={b._id} className="bg-white rounded-xl shadow p-6">
              <div className="flex flex-wrap justify-between items-start gap-4">
                <div>
                  <h3 className="font-semibold text-eco-dark">{b.serviceId?.title}</h3>
                  <p className="text-sm text-gray-600">{b.userId?.name} ({b.userId?.email})</p>
                  <p className="text-sm text-gray-600 mt-1">Date: {new Date(b.date).toLocaleDateString()} | {b.city} | {b.address}</p>
                  <p className="text-sm text-gray-600">Phone: {b.phone}</p>
                  {b.notes && <p className="text-sm text-gray-500">Notes: {b.notes}</p>}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${STATUS_STYLES[b.status] || 'bg-gray-100'}`}>
                    {b.status}
                  </span>
                  <select
                    value={b.status}
                    onChange={(e) => handleStatus(b._id, e.target.value)}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    <option value="pending">pending</option>
                    <option value="approved">approved</option>
                    <option value="completed">completed</option>
                    <option value="rejected">rejected</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
          {bookings.length === 0 && <p className="text-gray-600 py-8">No bookings</p>}
        </div>
      </main>
    </div>
  );
}
