import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ordersApi } from '../api';
import Navbar from './components/Navbar';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=200&q=80';

export default function Cart() {
  const { items, updateQuantity, removeItem, totalPrice, totalItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [placing, setPlacing] = React.useState(false);

  const handleCheckout = async () => {
    if (!items.length) return;
    setPlacing(true);
    try {
      await ordersApi.create(items.map((i) => ({ seedId: i.seedId, quantity: i.quantity })));
      clearCart();
      navigate('/orders');
    } catch (err) {
      alert(err.response?.data?.message || 'Checkout failed. Please try again.');
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="min-h-screen bg-eco-light">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-eco-dark mb-6">Cart</h1>

        {items.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-12 text-center">
            <p className="text-gray-600 mb-4">Your cart is empty</p>
            <Link to="/products" className="text-eco-green font-medium hover:underline">
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {items.map((item) => (
                <div
                  key={item.seedId}
                  className="bg-white rounded-xl shadow p-4 flex flex-wrap items-center gap-4"
                >
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <img
                      src={FALLBACK_IMG}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-eco-dark">{item.name}</h3>
                    <p className="text-eco-green font-bold">₹{item.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.seedId, item.quantity - 1)}
                      className="w-8 h-8 rounded border border-gray-300 hover:bg-gray-50"
                    >
                      −
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.seedId, item.quantity + 1)}
                      className="w-8 h-8 rounded border border-gray-300 hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>
                  <p className="font-semibold text-eco-dark">₹{item.price * item.quantity}</p>
                  <button
                    onClick={() => removeItem(item.seedId)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl shadow p-6 max-w-md">
              <p className="text-lg font-bold text-eco-dark mb-2">
                Total ({totalItems} items): ₹{totalPrice}
              </p>
              <button
                onClick={handleCheckout}
                disabled={placing}
                className="w-full py-3 bg-eco-green text-white rounded-lg hover:bg-eco-dark disabled:opacity-50"
              >
                {placing ? 'Placing order...' : 'Checkout'}
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
