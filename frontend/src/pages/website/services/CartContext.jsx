import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const fetchCartCount = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/home`);
      setCartCount(res.data.data.cartItemCount);
    } catch (err) {
      console.error('Error fetching cart count:', err);
    }
  };

  const updateCartCount = (change) => {
    setCartCount(prev => Math.max(0, prev + change));
  };

  useEffect(() => {
    fetchCartCount();
  }, []);

  const value = {
    cartCount,
    updateCartCount,
    fetchCartCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};