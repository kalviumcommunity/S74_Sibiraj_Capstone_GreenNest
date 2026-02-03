import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { seedsApi } from '../api';
import { useAuth } from '../context/AuthContext';
import '../App.css';

function Seeds() {
  const { user, logout } = useAuth();
  const [seeds, setSeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionMessage, setActionMessage] = useState('');
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    seedsApi.getAll()
      .then(({ data }) => setSeeds(data))
      .catch(() => setError('Could not load seeds'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!actionMessage) return undefined;
    const t = setTimeout(() => setActionMessage(''), 2500);
    return () => clearTimeout(t);
  }, [actionMessage]);

  const fallbackImage = 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80&auto=format&fit=crop';

  const getQty = (id) => quantities[id] ?? 1;

  const handleQtyChange = (id, value) => {
    setQuantities((prev) => ({ ...prev, [id]: Number(value) }));
  };

  const handleAddToCart = (seed) => {
    const qty = getQty(seed._id);
    setActionMessage(`${seed.name} x${qty} added to cart`);
  };

  const handleBuyNow = (seed) => {
    const qty = getQty(seed._id);
    setActionMessage(`Proceeding to buy ${seed.name} x${qty}`);
  };

  return (
    <div>
      <nav className="navbar">
        <Link to="/" className="logo">🌿 GreenNest</Link>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/seeds">Seeds</Link></li>
          <li><a href="/#tips">Services</a></li>
          <li><a href="/#summary">Eco-Points</a></li>
        </ul>
        <div className="nav-actions">
          {user ? (
            <>
              <span className="user-badge">Welcome, {user.username || 'User'}!</span>
              <Link to="/">Home</Link>
              <button className="join-btn" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Sign in</Link>
              <Link to="/register" className="join-btn link-btn">Join GreenNest</Link>
            </>
          )}
        </div>
      </nav>

      <section className="green-summary-cards-section" style={{ paddingTop: 40 }}>
        <h2 className="section-title">Organic Seed Catalog</h2>
        <p className="section-desc">Discover our rich variety of organic seeds</p>
        {actionMessage && <div className="seed-toast">{actionMessage}</div>}
        {loading && <p>Loading seeds...</p>}
        {error && <p className="auth-error" style={{ maxWidth: 400, margin: '0 auto 20px' }}>{error}</p>}
        <div className="summary-cards-grid">
          {seeds.map((s) => (
            <div key={s._id} className="summary-card seed-card">
              <div className="seed-image-wrap">
                <img
                  src={s.image || fallbackImage}
                  alt={s.name}
                  className="seed-image"
                />
                {s.ecoPoints != null && (
                  <span className="seed-badge">+{s.ecoPoints} Eco</span>
                )}
              </div>
              <h3>{s.name}</h3>
              <p>Category: {s.category || 'General'}</p>
              {s.price != null ? (
                <p className="seed-price">Price: ₹{s.price}</p>
              ) : (
                <p className="seed-price">Price: Contact us</p>
              )}
              <div className="seed-actions">
                <label className="seed-qty">
                  Qty
                  <select
                    value={getQty(s._id)}
                    onChange={(e) => handleQtyChange(s._id, e.target.value)}
                  >
                    {[1, 2, 3, 4, 5].map((q) => (
                      <option key={q} value={q}>{q}</option>
                    ))}
                  </select>
                </label>
                <button
                  type="button"
                  className="seed-btn"
                  onClick={() => handleAddToCart(s)}
                >
                  Add to Cart
                </button>
                <button
                  type="button"
                  className="seed-btn secondary"
                  onClick={() => handleBuyNow(s)}
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
        {!loading && seeds.length === 0 && !error && (
          <p>No seeds in catalog yet. Check back soon!</p>
        )}
      </section>
    </div>
  );
}

export default Seeds;
