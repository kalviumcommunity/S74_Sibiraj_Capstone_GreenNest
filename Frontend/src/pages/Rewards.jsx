import React, { useState, useEffect } from 'react';
import { userApi, rewardsApi } from '../api';
import Navbar from './components/Navbar';

export default function Rewards() {
  const [points, setPoints] = useState(0);
  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    userApi.getPoints().then(({ data }) => setPoints(data.ecoPoints)).catch(() => {});
    rewardsApi.getAll().then(({ data }) => setRewards(data)).catch(() => []);
  }, []);

  return (
    <div className="min-h-screen bg-eco-light">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-eco-dark mb-6">Eco Rewards</h1>
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <p className="text-2xl font-bold text-eco-green">Your Points: {points}</p>
          <p className="text-gray-600 mt-1">Earn points by buying eco products, tracking plants, and seed exchange</p>
        </div>
        <h2 className="text-xl font-semibold mb-4">Available Rewards</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rewards.map((r) => (
            <div key={r._id} className="bg-white rounded-xl shadow p-6">
              <h3 className="font-semibold text-eco-dark">{r.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{r.description}</p>
              <p className="mt-2 font-bold text-eco-green">{r.pointsRequired} points</p>
              <p className={points >= r.pointsRequired ? 'text-green-600 text-sm' : 'text-gray-500 text-sm'}>
                {points >= r.pointsRequired ? '✓ You can redeem!' : 'Keep earning to unlock'}
              </p>
            </div>
          ))}
          {rewards.length === 0 && <p className="text-gray-600 col-span-full">No rewards yet</p>}
        </div>
      </main>
    </div>
  );
}
