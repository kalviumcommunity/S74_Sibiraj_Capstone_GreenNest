import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productsApi } from '../api';
import { useCart } from '../context/CartContext';
import Navbar from './components/Navbar';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&q=80';

function ProductImage({ src, alt }) {
  const [imgSrc, setImgSrc] = useState(src || FALLBACK_IMG);
  return (
    <img
      src={imgSrc}
      alt={alt}
      className="w-full h-full object-cover"
      onError={() => setImgSrc(FALLBACK_IMG)}
    />
  );
}

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const { addItem } = useCart();

  useEffect(() => {
    productsApi.getAll({ search: search || undefined, category: category || undefined })
      .then(({ data }) => setProducts(data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [search, category]);

  return (
    <div className="min-h-screen bg-eco-light">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-eco-dark mb-6">Organic Seed Catalog</h1>

        <div className="flex flex-wrap gap-4 mb-6">
          <input
            type="text"
            placeholder="Search seeds..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border border-eco-green rounded-lg flex-1 min-w-[200px]"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 border border-eco-green rounded-lg"
          >
            <option value="">All categories</option>
            <option value="vegetable">Vegetable</option>
            <option value="herb">Herb</option>
            <option value="flower">Flower</option>
          </select>
        </div>

        {loading && <p className="text-eco-dark">Loading...</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((p) => (
            <div key={p._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
              <Link to={`/products/${p._id}`} className="block">
                <div className="h-48 bg-gray-100">
                  <ProductImage src={p.image} alt={p.name} />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-eco-dark">{p.name}</h3>
                  <p className="text-sm text-gray-600">{p.category}</p>
                  <p className="text-eco-green font-bold mt-2">₹{p.price}</p>
                </div>
              </Link>
              <div className="px-4 pb-4">
                <button
                  onClick={() => addItem(p)}
                  className="w-full py-2 bg-eco-green text-white rounded-lg hover:bg-eco-dark text-sm"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
        {!loading && products.length === 0 && (
          <p className="text-center text-gray-600 py-12">No products found</p>
        )}
      </main>
    </div>
  );
}
