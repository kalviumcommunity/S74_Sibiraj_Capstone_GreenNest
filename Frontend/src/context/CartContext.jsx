import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('greennest_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('greennest_cart', JSON.stringify(items));
  }, [items]);

  const addItem = (product, quantity = 1) => {
    setItems((prev) => {
      const found = prev.find((i) => i.seedId === product._id);
      if (found) {
        return prev.map((i) =>
          i.seedId === product._id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { seedId: product._id, name: product.name, price: product.price || 0, quantity }];
    });
  };

  const updateQuantity = (seedId, quantity) => {
    if (quantity < 1) {
      setItems((prev) => prev.filter((i) => i.seedId !== seedId));
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.seedId === seedId ? { ...i, quantity } : i))
    );
  };

  const removeItem = (seedId) => {
    setItems((prev) => prev.filter((i) => i.seedId !== seedId));
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        totalItems,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
