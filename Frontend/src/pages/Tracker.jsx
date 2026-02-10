import React, { useState, useEffect } from 'react';
import { trackerApi, productsApi } from '../api';
import Navbar from './components/Navbar';

const STAGES = ['sowing', 'germination', 'seedling', 'vegetative', 'flowering', 'fruiting', 'harvest'];

export default function Tracker() {
  const [plants, setPlants] = useState([]);
  const [seeds, setSeeds] = useState([]);
  const [adding, setAdding] = useState(false);
  const [selectedSeed, setSelectedSeed] = useState('');

  useEffect(() => {
    trackerApi.getMyPlants().then(({ data }) => setPlants(data)).catch(() => []);
    productsApi.getAll().then(({ data }) => setSeeds(data)).catch(() => []);
  }, []);

  const handleAdd = async () => {
    if (!selectedSeed) return;
    setAdding(true);
    try {
      await trackerApi.addPlant(selectedSeed);
      const { data } = await trackerApi.getMyPlants();
      setPlants(data);
      setSelectedSeed('');
    } catch (e) {
      alert(e.response?.data?.message || 'Failed to add');
    } finally {
      setAdding(false);
    }
  };

  const handleUpdate = async (id, growthStage, notes) => {
    try {
      await trackerApi.updatePlant(id, { growthStage, notes });
      const { data } = await trackerApi.getMyPlants();
      setPlants(data);
    } catch (e) {
      alert(e.response?.data?.message || 'Update failed');
    }
  };

  return (
    <div className="min-h-screen bg-eco-light">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-eco-dark mb-6">Plant Tracker</h1>

        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Add Plant</h2>
          <div className="flex gap-4 flex-wrap">
            <select
              value={selectedSeed}
              onChange={(e) => setSelectedSeed(e.target.value)}
              className="border rounded px-4 py-2 min-w-[200px]"
            >
              <option value="">Select seed</option>
              {seeds.map((s) => (
                <option key={s._id} value={s._id}>{s.name}</option>
              ))}
            </select>
            <button
              onClick={handleAdd}
              disabled={adding || !selectedSeed}
              className="px-6 py-2 bg-eco-green text-white rounded-lg hover:bg-eco-dark disabled:opacity-50"
            >
              {adding ? 'Adding...' : 'Add Plant'}
            </button>
          </div>
        </div>

        <div className="grid gap-4">
          {plants.map((p) => (
            <div key={p._id} className="bg-white rounded-xl shadow p-6">
              <div className="flex justify-between items-start flex-wrap gap-4">
                <div>
                  <h3 className="font-semibold text-eco-dark">{p.seedName}</h3>
                  <p className="text-sm text-gray-600">Planted {new Date(p.plantedDate).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-2 items-center flex-wrap">
                  <label className="text-sm">Stage:</label>
                  <select
                    value={p.growthStage}
                    onChange={(e) => handleUpdate(p._id, e.target.value, p.notes)}
                    className="border rounded px-2 py-1"
                  >
                    {STAGES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
              {p.notes && <p className="mt-2 text-gray-600">Notes: {p.notes}</p>}
              <input
                type="text"
                placeholder="Add note..."
                defaultValue={p.notes}
                onBlur={(e) => {
                  const v = e.target.value.trim();
                  if (v !== p.notes) handleUpdate(p._id, p.growthStage, v);
                }}
                className="mt-2 w-full border rounded px-3 py-2 text-sm"
              />
            </div>
          ))}
          {plants.length === 0 && <p className="text-center text-gray-600 py-8">No plants tracked yet</p>}
        </div>
      </main>
    </div>
  );
}
