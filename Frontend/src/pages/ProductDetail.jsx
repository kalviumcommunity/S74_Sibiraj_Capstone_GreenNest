import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { productsApi, ordersApi } from '../api';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import Navbar from './components/Navbar';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    productsApi.getById(id)
      .then(({ data }) => setProduct(data))
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  const handleBuyNow = async () => {
    if (!user) return navigate('/login');
    setAdding(true);
    try {
      await ordersApi.create([{ seedId: id, quantity: qty }]);
      navigate('/orders');
    } catch (e) {
      alert(e.response?.data?.message || 'Order failed');
    } finally {
      setAdding(false);
    }
  };

  if (loading || !product) {
    return (
      <div className="min-h-screen bg-eco-light">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">{loading ? 'Loading...' : 'Product not found'}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-eco-light">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 bg-white rounded-xl shadow-lg p-6">
          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
            <img
              src={product.image || FALLBACK_IMG}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => { e.target.src = FALLBACK_IMG; }}
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-eco-dark">{product.name}</h1>
            <p className="text-gray-600 mt-2">{product.category}</p>
            <p className="text-eco-green font-bold text-xl mt-4">₹{product.price}</p>
            {product.description && <p className="mt-4 text-gray-700">{product.description}</p>}
            {product.fertilizerSuggestion && (
              <div className="mt-4 p-3 bg-eco-light rounded-lg">
                <strong>Fertilizer:</strong> {product.fertilizerSuggestion}
              </div>
            )}
            {product.wateringFrequency && <p><strong>Watering:</strong> {product.wateringFrequency}</p>}
            {product.sunlightNeeds && <p><strong>Sunlight:</strong> {product.sunlightNeeds}</p>}

            {user && (
              <div className="mt-6 flex flex-wrap gap-4 items-center">
                <label className="flex items-center gap-2">
                  Qty
                  <select value={qty} onChange={(e) => setQty(Number(e.target.value))} className="border rounded px-2 py-1">
                    {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}</option>)}
                  </select>
                </label>
                <button
                  onClick={() => addItem(product, qty)}
                  className="px-6 py-2 border-2 border-eco-green text-eco-green rounded-lg hover:bg-eco-light"
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  disabled={adding}
                  className="px-6 py-2 bg-eco-green text-white rounded-lg hover:bg-eco-dark disabled:opacity-50"
                >
                  {adding ? 'Adding...' : 'Buy Now'}
                </button>
              </div>
            )}
            {!user && (
              <p className="mt-4 text-gray-600"><Link to="/login" className="text-eco-green font-medium">Sign in</Link> to buy</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
