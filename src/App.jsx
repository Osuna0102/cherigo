import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item._id === product._id);
      if (existingItem) {
        return prevItems.map(item =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item._id === product._id);
      if (existingItem.quantity === 1) {
        return prevItems.filter(item => item._id !== product._id);
      } else {
        return prevItems.map(item =>
          item._id === product._id ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header cartItems={cartItems} />
      <div className="flex-grow pt-10">
        <Outlet context={{ addToCart, cartItems, removeFromCart }} />
      </div>
      <Footer />
    </div>
  );
}

export default App;