import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Seeds from "./pages/Seeds";
import Dashboard from "./pages/Dashboard";
import Tracker from "./pages/Tracker";
import Orders from "./pages/Orders";
import SeedExchange from "./pages/SeedExchange";
import Rewards from "./pages/Rewards";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AdminUsers from "./pages/AdminUsers";
import AdminOrders from "./pages/AdminOrders";
import AdminServices from "./pages/AdminServices";
import AdminBookings from "./pages/AdminBookings";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import MyBookings from "./pages/MyBookings";
import Cart from "./pages/Cart";
import "./App.css";

function SuccessToast() {
  const { successMessage, clearSuccessMessage } = useAuth();
  useEffect(() => {
    if (successMessage) {
      const t = setTimeout(clearSuccessMessage, 3000);
      return () => clearTimeout(t);
    }
  }, [successMessage, clearSuccessMessage]);
  if (!successMessage) return null;
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-eco-green text-white px-6 py-3 rounded-lg shadow-lg z-50 font-semibold">
      {successMessage}
    </div>
  );
}

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? children : <Navigate to="/login" replace />;
}

function AdminRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "admin") return <Navigate to="/" replace />;
  return children;
}

function PublicOnlyRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? <Navigate to="/" replace /> : children;
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
      <SuccessToast />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
          <Route path="/services" element={<ProtectedRoute><Services /></ProtectedRoute>} />
          <Route path="/services/:id" element={<ProtectedRoute><ServiceDetail /></ProtectedRoute>} />
          <Route path="/products/:id" element={<ProtectedRoute><ProductDetail /></ProtectedRoute>} />
          <Route path="/login" element={<PublicOnlyRoute><Login /></PublicOnlyRoute>} />
          <Route path="/register" element={<PublicOnlyRoute><Register /></PublicOnlyRoute>} />
          <Route path="/seeds" element={<ProtectedRoute><Seeds /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/tracker" element={<ProtectedRoute><Tracker /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/seed-exchange" element={<ProtectedRoute><SeedExchange /></ProtectedRoute>} />
          <Route path="/rewards" element={<ProtectedRoute><Rewards /></ProtectedRoute>} />
          <Route path="/my-bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/products" element={<AdminRoute><AdminProducts /></AdminRoute>} />
          <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
          <Route path="/admin/orders" element={<AdminRoute><AdminOrders /></AdminRoute>} />
          <Route path="/admin/services" element={<AdminRoute><AdminServices /></AdminRoute>} />
          <Route path="/admin/bookings" element={<AdminRoute><AdminBookings /></AdminRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
