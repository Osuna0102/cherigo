import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LanguageProvider } from './lib/languageContext';


function App() {
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = ({ product, choice: selectedChoice, quantity }) => {
    if (!selectedChoice || quantity <= 0) {
      alert("Please select a choice and quantity before adding to cart.");
      return;
    }

    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item._id === product._id && item.selectedChoice === selectedChoice);
      if (existingItem) {
        return prevItems.map(item =>
          item._id === product._id && item.selectedChoice === selectedChoice
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevItems, { ...product, selectedChoice, quantity }];
      }
    });
  };

  const removeFromCart = ({ product, choice: selectedChoice, quantity }) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item._id === product._id && item.selectedChoice === selectedChoice);

      if (!existingItem) return prevItems;

     if (existingItem.quantity <= quantity) {
      return prevItems.filter(item => !(item._id === product._id && item.selectedChoice === selectedChoice));
    } else {
      return prevItems.map(item =>
        item._id === product._id && item.selectedChoice === selectedChoice
          ? { ...item, quantity: item.quantity - quantity }
          : item
      );
    }
  });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <LanguageProvider>
        <Header cartItems={cartItems} />
        <div className="flex-grow pt-10 overflow-y-hidden">
        <Outlet context={{ addToCart, cartItems, removeFromCart }} />
        </div>
        <Footer />
      </LanguageProvider>
      
    </div>
  );
}

export default App;