import React, { useState, useEffect } from 'react';
import { seedExchangeApi } from '../api';
import Navbar from './components/Navbar';

export default function SeedExchange() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ seedName: '', quantity: 1, location: '' });
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    seedExchangeApi.getAll()
      .then(({ data }) => setListings(data))
      .catch(() => setListings([]))
      .finally(() => setLoading(false));
  }, []);

  const handlePost = async (e) => {
    e.preventDefault();
    setPosting(true);
    try {
      await seedExchangeApi.post(form);
      const { data } = await seedExchangeApi.getAll();
      setListings(data);
      setForm({ seedName: '', quantity: 1, location: '' });
    } catch (e) {
      alert(e.response?.data?.message || 'Failed to post');
    } finally {
      setPosting(false);
    }
  };

  const handleRequest = async (id) => {
    try {
      await seedExchangeApi.request(id);
      const { data } = await seedExchangeApi.getAll();
      setListings(data);
    } catch (e) {
      alert(e.response?.data?.message || 'Failed to request');
    }
  };

  return (
    <div className="min-h-screen bg-eco-light">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-eco-dark mb-6">Seed Exchange</h1>

        <form onSubmit={handlePost} className="bg-white rounded-xl shadow p-6 mb-8 max-w-md">
          <h2 className="text-lg font-semibold mb-4">Post Available Seeds</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Seed name"
              value={form.seedName}
              onChange={(e) => setForm({ ...form, seedName: e.target.value })}
              required
              className="w-full border rounded px-4 py-2"
            />
            <input
              type="number"
              placeholder="Quantity"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: +e.target.value })}
              min={1}
              className="w-full border rounded px-4 py-2"
            />
            <input
              type="text"
              placeholder="Location"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              required
              className="w-full border rounded px-4 py-2"
            />
            <button type="submit" disabled={posting} className="px-6 py-2 bg-eco-green text-white rounded-lg hover:bg-eco-dark disabled:opacity-50">
              {posting ? 'Posting...' : 'Post'}
            </button>
          </div>
        </form>

        <h2 className="text-xl font-semibold mb-4">Community Listings</h2>
        {loading && <p>Loading...</p>}
        <div className="grid gap-4">
          {listings.map((l) => (
            <div key={l._id} className="bg-white rounded-xl shadow p-6 flex justify-between items-center flex-wrap gap-4">
              <div>
                <h3 className="font-semibold text-eco-dark">{l.seedName}</h3>
                <p>Qty: {l.quantity} | {l.location}</p>
                <p className="text-sm text-gray-600">by {l.userId?.name || 'User'}</p>
              </div>
              {l.status === 'available' && (
                <button
                  onClick={() => handleRequest(l._id)}
                  className="px-4 py-2 bg-eco-green text-white rounded-lg hover:bg-eco-dark"
                >
                  Request
                </button>
              )}
            </div>
          ))}
          {!loading && listings.length === 0 && <p className="text-gray-600 py-8">No listings yet</p>}
        </div>
      </main>
    </div>
  );
}
