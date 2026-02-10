import React, { useState, useEffect } from 'react';
import { adminApi } from '../api';
import Navbar from './components/Navbar';

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', price: 0, duration: '', category: 'terrace' });
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    adminApi.getServices().then(({ data }) => setServices(data)).catch(() => []);
  }, []);

  const resetForm = () => {
    setForm({ title: '', description: '', price: 0, duration: '', category: 'terrace' });
    setEditing(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        await adminApi.updateService(editing, form);
      } else {
        await adminApi.addService(form);
      }
      const { data } = await adminApi.getServices();
      setServices(data);
      resetForm();
    } catch (e) {
      alert(e.response?.data?.message || 'Failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this service?')) return;
    try {
      await adminApi.deleteService(id);
      setServices((s) => s.filter((x) => x._id !== id));
    } catch (e) {
      alert(e.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <div className="min-h-screen bg-eco-light">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-eco-dark mb-6">Manage Services</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 mb-8 max-w-2xl">
          <h2 className="text-lg font-semibold mb-4">{editing ? 'Edit' : 'Add'} Service</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <input type="text" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required className="border rounded px-4 py-2" />
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="border rounded px-4 py-2">
              <option value="terrace">Terrace garden</option>
              <option value="balcony">Balcony garden</option>
              <option value="vermicompost">Vermicompost</option>
              <option value="maintenance">Maintenance</option>
            </select>
            <input type="number" placeholder="Price" value={form.price || ''} onChange={(e) => setForm({ ...form, price: +e.target.value })} required className="border rounded px-4 py-2" />
            <input type="text" placeholder="Duration (e.g. 2-3 hours)" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} className="border rounded px-4 py-2" />
            <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="border rounded px-4 py-2 sm:col-span-2" rows={2} />
          </div>
          <div className="mt-4 flex gap-4">
            <button type="submit" disabled={saving} className="px-6 py-2 bg-eco-green text-white rounded-lg hover:bg-eco-dark disabled:opacity-50">
              {saving ? 'Saving...' : editing ? 'Update' : 'Add'}
            </button>
            {editing && <button type="button" onClick={resetForm} className="px-6 py-2 border rounded-lg">Cancel</button>}
          </div>
        </form>

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-eco-dark text-white">
              <tr>
                <th className="text-left p-4">Title</th>
                <th className="text-left p-4">Category</th>
                <th className="text-left p-4">Price</th>
                <th className="text-left p-4">Duration</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((s) => (
                <tr key={s._id} className="border-t">
                  <td className="p-4">{s.title}</td>
                  <td className="p-4">{s.category}</td>
                  <td className="p-4">₹{s.price}</td>
                  <td className="p-4">{s.duration || '-'}</td>
                  <td className="p-4">
                    <button onClick={() => { setForm({ ...s }); setEditing(s._id); }} className="text-eco-green mr-2">Edit</button>
                    <button onClick={() => handleDelete(s._id)} className="text-red-600">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
