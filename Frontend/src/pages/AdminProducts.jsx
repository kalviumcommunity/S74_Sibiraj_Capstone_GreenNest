import React, { useState, useEffect } from 'react';
import { adminApi, productsApi } from '../api';
import Navbar from './components/Navbar';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: '', category: 'vegetable', price: 0, description: '', fertilizerSuggestion: '',
    stock: 0, image: '', ecoPoints: 0,
  });
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    productsApi.getAll().then(({ data }) => setProducts(data)).catch(() => []);
  }, []);

  const resetForm = () => {
    setForm({ name: '', category: 'vegetable', price: 0, description: '', fertilizerSuggestion: '', stock: 0, image: '', ecoPoints: 0 });
    setEditing(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        await adminApi.updateProduct(editing, form);
      } else {
        await adminApi.addProduct(form);
      }
      const { data } = await productsApi.getAll();
      setProducts(data);
      resetForm();
    } catch (e) {
      alert(e.response?.data?.message || 'Failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return;
    try {
      await adminApi.deleteProduct(id);
      setProducts((p) => p.filter((x) => x._id !== id));
    } catch (e) {
      alert(e.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <div className="min-h-screen bg-eco-light">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-eco-dark mb-6">Manage Products</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 mb-8 max-w-2xl">
          <h2 className="text-lg font-semibold mb-4">{editing ? 'Edit' : 'Add'} Product</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <input type="text" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="border rounded px-4 py-2" />
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="border rounded px-4 py-2">
              <option value="vegetable">Vegetable</option>
              <option value="herb">Herb</option>
              <option value="flower">Flower</option>
            </select>
            <input type="number" placeholder="Price" value={form.price || ''} onChange={(e) => setForm({ ...form, price: +e.target.value })} required className="border rounded px-4 py-2" />
            <input type="number" placeholder="Stock" value={form.stock || ''} onChange={(e) => setForm({ ...form, stock: +e.target.value })} className="border rounded px-4 py-2" />
            <input type="text" placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="border rounded px-4 py-2 sm:col-span-2" />
            <input type="text" placeholder="Fertilizer suggestion" value={form.fertilizerSuggestion} onChange={(e) => setForm({ ...form, fertilizerSuggestion: e.target.value })} className="border rounded px-4 py-2 sm:col-span-2" />
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
                <th className="text-left p-4">Name</th>
                <th className="text-left p-4">Category</th>
                <th className="text-left p-4">Price</th>
                <th className="text-left p-4">Stock</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="border-t">
                  <td className="p-4">{p.name}</td>
                  <td className="p-4">{p.category}</td>
                  <td className="p-4">₹{p.price}</td>
                  <td className="p-4">{p.stock}</td>
                  <td className="p-4">
                    <button onClick={() => { setForm({ ...p }); setEditing(p._id); }} className="text-eco-green mr-2">Edit</button>
                    <button onClick={() => handleDelete(p._id)} className="text-red-600">Delete</button>
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
