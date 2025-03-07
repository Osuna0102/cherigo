import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

const Header = () => {
  return (
    <header
      className="w-full p-2 bg-gray-100 flex justify-between items-center shadow-md fixed top-0 left-0 z-50"
      style={{ backgroundImage: 'url(public/assets/bg.png)', backgroundSize: 'cover' }}
    >
      <div className="flex items-center">
        <img src="public/assets/cherigoicon.png" alt="Logo" className="h-10" />
        <img src="public/assets/CheriGo.png" alt="Logo" className="ml-2" />
      </div>
      <nav className="flex-1 flex justify-center">
        <Link
          to="/"
          className="ml-4 bg-[#fff6e1] text-[#eb8194] px-4 py-2 rounded hover:bg-[#eb8194] hover:text-white transition-colors duration-300"
        >
          Home
        </Link>
        <Link
          to="/about-us"
          className="ml-4 bg-[#fff6e1] text-[#eb8194] px-4 py-2 rounded hover:bg-[#eb8194] hover:text-white transition-colors duration-300"
        >
          About Us
        </Link>
        <Link
          to="/products"
          className="ml-4 bg-[#fff6e1] text-[#eb8194] px-4 py-2 rounded hover:bg-[#eb8194] hover:text-white transition-colors duration-300"
        >
          Products
        </Link>
      </nav>
      <div className="flex items-center pr-4">
        <Link to="/cart" className="ml-4 text-[#eb8194] hover:text-white transition-colors duration-300">
        <FaShoppingCart className="text-4xl text-[#fff3da]" />
        </Link>
      </div>
    </header>
  );
};

export default Header;