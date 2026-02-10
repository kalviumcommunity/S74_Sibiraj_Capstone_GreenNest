import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();

  return (
    <nav className="bg-white shadow-md px-4 py-3 flex flex-wrap items-center justify-between gap-4">
      <Link to="/" className="text-2xl font-bold text-eco-dark flex items-center gap-2">
        🌿 GreenNest
      </Link>
      <ul className="flex gap-4 items-center flex-wrap">
        <li><Link to="/" className="text-eco-dark hover:text-eco-green">Home</Link></li>
        {user && (
          <>
            <li><Link to="/products" className="text-eco-dark hover:text-eco-green">Products</Link></li>
            <li><Link to="/services" className="text-eco-dark hover:text-eco-green">Services</Link></li>
            <li><Link to="/dashboard" className="text-eco-dark hover:text-eco-green">Dashboard</Link></li>
            <li><Link to="/tracker" className="text-eco-dark hover:text-eco-green">Plant Tracker</Link></li>
            <li><Link to="/cart" className="text-eco-dark hover:text-eco-green flex items-center gap-1">Cart {totalItems > 0 && <span className="bg-eco-green text-white text-xs px-1.5 py-0.5 rounded-full">{totalItems}</span>}</Link></li>
            <li><Link to="/orders" className="text-eco-dark hover:text-eco-green">Orders</Link></li>
            <li><Link to="/seed-exchange" className="text-eco-dark hover:text-eco-green">Seed Exchange</Link></li>
            <li><Link to="/my-bookings" className="text-eco-dark hover:text-eco-green">My Bookings</Link></li>
          </>
        )}
        {!user && (
          <li><a href="#our-services" className="text-eco-dark hover:text-eco-green">What We Offer</a></li>
        )}
        {user?.role === 'admin' && (
          <li><Link to="/admin" className="text-eco-dark hover:text-eco-green font-semibold">Admin</Link></li>
        )}
      </ul>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-eco-green font-medium">Welcome, {user.name || 'User'}!</span>
            <button onClick={logout} className="px-4 py-2 bg-eco-green text-white rounded-lg hover:bg-eco-dark">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-eco-dark hover:text-eco-green">Sign in</Link>
            <Link to="/register" className="px-4 py-2 bg-eco-green text-white rounded-lg hover:bg-eco-dark">
              Join GreenNest
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
