import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bookingsApi } from '../api';
import Navbar from './components/Navbar';

const STATUS_STYLES = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
};

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    bookingsApi.getMy()
      .then(({ data }) => setBookings(data))
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-eco-light">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-eco-dark mb-2">My Bookings</h1>
        <p className="text-gray-600 mb-8">Track your garden setup service bookings</p>

        {loading && <p className="text-eco-dark">Loading...</p>}
        <div className="space-y-4">
          {bookings.map((b) => (
            <div key={b._id} className="bg-white rounded-xl shadow p-6">
              <div className="flex flex-wrap justify-between items-start gap-4">
                <div>
                  <h3 className="font-semibold text-eco-dark text-lg">{b.serviceId?.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{b.serviceId?.category}</p>
                  <p className="text-eco-green font-bold mt-2">₹{b.serviceId?.price}</p>
                  <p className="text-sm text-gray-600 mt-2">
                    Date: {new Date(b.date).toLocaleDateString()} | {b.city} | {b.address}
                  </p>
                  {b.notes && <p className="text-sm text-gray-500 mt-1">Notes: {b.notes}</p>}
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${STATUS_STYLES[b.status] || 'bg-gray-100 text-gray-800'}`}>
                  {b.status}
                </span>
              </div>
            </div>
          ))}
          {!loading && bookings.length === 0 && (
            <div className="bg-white rounded-xl shadow p-12 text-center">
              <p className="text-gray-600 mb-4">No bookings yet</p>
              <Link to="/services" className="inline-block px-6 py-2 bg-eco-green text-white rounded-lg hover:bg-eco-dark">
                Browse Services
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
