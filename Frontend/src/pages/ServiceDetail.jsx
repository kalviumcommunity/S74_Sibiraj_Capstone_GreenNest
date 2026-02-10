import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { servicesApi, bookingsApi } from '../api';
import { useAuth } from '../context/AuthContext';
import Navbar from './components/Navbar';

export default function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ date: '', city: '', address: '', phone: '', notes: '' });
  const [success, setSuccess] = useState('');

  useEffect(() => {
    servicesApi.getById(id)
      .then(({ data }) => setService(data))
      .catch(() => setService(null))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return navigate('/login');
    setSubmitting(true);
    setSuccess('');
    try {
      await bookingsApi.create({
        serviceId: id,
        date: form.date,
        city: form.city,
        address: form.address,
        phone: form.phone,
        notes: form.notes,
      });
      setSuccess('Booking submitted! Check My Bookings for status.');
      setForm({ date: '', city: '', address: '', phone: '', notes: '' });
      setTimeout(() => navigate('/my-bookings'), 1500);
    } catch (e) {
      setSuccess(e.response?.data?.message || 'Booking failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !service) {
    return (
      <div className="min-h-screen bg-eco-light">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">{loading ? 'Loading...' : 'Service not found'}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-eco-light">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <span className="text-xs font-medium px-2 py-1 rounded bg-eco-light text-eco-dark">{service.category}</span>
            <h1 className="text-2xl font-bold text-eco-dark mt-2">{service.title}</h1>
            <p className="text-gray-600 mt-2">{service.description}</p>
            <p className="text-eco-green font-bold text-xl mt-4">₹{service.price}</p>
            {service.duration && <p className="text-sm text-gray-500">Duration: {service.duration}</p>}
          </div>

          {user ? (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-eco-dark mb-4">Book this service</h2>
              {success && (
                <div className={`mb-4 p-3 rounded-lg ${success.includes('submitted') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {success}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-eco-dark mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-eco-green focus:border-eco-green"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-eco-dark mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    placeholder="City"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-eco-green focus:border-eco-green"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-eco-dark mb-1">Address</label>
                  <textarea
                    required
                    rows={3}
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    placeholder="Full address for service"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-eco-green focus:border-eco-green"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-eco-dark mb-1">Phone</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="Contact number"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-eco-green focus:border-eco-green"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-eco-dark mb-1">Notes (optional)</label>
                  <textarea
                    rows={2}
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    placeholder="Special requirements..."
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-eco-green focus:border-eco-green"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full px-6 py-3 bg-eco-green text-white rounded-lg hover:bg-eco-dark font-semibold disabled:opacity-50 transition"
                >
                  {submitting ? 'Submitting...' : 'Confirm Booking'}
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow p-6 text-center">
              <p className="text-gray-600"><Link to="/login" className="text-eco-green font-medium">Sign in</Link> to book this service</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
