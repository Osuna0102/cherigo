import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaHome, FaInfoCircle, FaStore } from 'react-icons/fa';

const Header = ({ cartItems }) => {
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header
      className="w-full p-3 bg-gray-100 flex justify-between items-center shadow-md fixed top-0 left-0 z-50"
      style={{ backgroundImage: 'url(/assets/bg.png)', backgroundSize: 'cover' }}
    >
      <div className="flex items-center">
        <img src="/assets/icon.png" alt="Logo" className="h-20" />
      </div>
      {/* Navigation - always horizontal with adaptive icons */}
      <nav className="flex-1 flex justify-center items-center space-x-1 sm:space-x-2 md:space-x-4 px-1 sm:px-2">
        <Link
          to="/"
          className="flex items-center justify-center bg-[#fff6e1] font-[Dynapuff] text-[#eb8194] px-2 sm:px-3 md:px-4 py-1 sm:py-2 md:py-3 rounded-full hover:bg-[#eb8194] hover:text-white transition-colors duration-300"
          aria-label="Home"
        >
          <FaHome className="w-6 h-6 sm:w-8 sm:h-8 md:w-8 md:h-8" />
          <span className="ml-1 text-xs sm:text-sm md:text-base hidden sm:inline">Home</span>
        </Link>
        
        <Link
          to="/about-us"
          className="flex items-center justify-center bg-[#fff6e1] font-[Dynapuff] text-[#eb8194] px-2 sm:px-3 md:px-4 py-1 sm:py-2 md:py-3 rounded-full hover:bg-[#eb8194] hover:text-white transition-colors duration-300"
          aria-label="About Us"
        >
          <FaInfoCircle  className="w-6 h-6 sm:w-8 sm:h-8 md:w-8 md:h-8" />
          <span className="ml-1 text-xs sm:text-sm md:text-base hidden sm:inline">About Us</span>
        </Link>
        
        <Link
          to="/products"
          className="flex items-center justify-center bg-[#fff6e1] font-[Dynapuff] text-[#eb8194] px-2 sm:px-3 md:px-4 py-1 sm:py-2 md:py-3 rounded-full hover:bg-[#eb8194] hover:text-white transition-colors duration-300"
          aria-label="Shop"
        >
          <img src="/assets/shop.png" alt=""  className="w-6 h-6 sm:w-8 sm:h-8 md:w-8 md:h-8" />
          <span className="ml-1 text-xs sm:text-sm md:text-base hidden sm:inline">Shop</span>
        </Link>
      </nav>
      
      <div className="flex items-center pr-4">
        <Link to="/cart" className="ml-4 text-[#eb8194] hover:text-white transition-colors duration-300 relative">
          <FaShoppingCart className="text-4xl text-[#fff3da]" />
          {cartItemCount > 0 && (
            <span className="absolute top-0 right-0 bg-[#f66d76] text-white rounded-full px-2 py-1 text-xs">
              {cartItemCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header;