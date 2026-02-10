import React, { useState, useEffect } from 'react';
import { adminApi } from '../api';
import Navbar from './components/Navbar';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    adminApi.getUsers().then(({ data }) => setUsers(data)).catch(() => []);
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this user?')) return;
    try {
      await adminApi.deleteUser(id);
      setUsers((u) => u.filter((x) => x._id !== id));
    } catch (e) {
      alert(e.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <div className="min-h-screen bg-eco-light">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-eco-dark mb-6">Manage Users</h1>
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-eco-dark text-white">
              <tr>
                <th className="text-left p-4">Name</th>
                <th className="text-left p-4">Email</th>
                <th className="text-left p-4">Role</th>
                <th className="text-left p-4">Eco Points</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-t">
                  <td className="p-4">{u.name}</td>
                  <td className="p-4">{u.email}</td>
                  <td className="p-4"><span className="px-2 py-1 rounded bg-eco-light">{u.role}</span></td>
                  <td className="p-4">{u.ecoPoints}</td>
                  <td className="p-4">
                    <button onClick={() => handleDelete(u._id)} className="text-red-600">Delete</button>
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
