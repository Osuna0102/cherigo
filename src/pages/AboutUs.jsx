import React from 'react';
import { FaInstagram, FaTwitter, FaEnvelope, FaStar } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex justify-center items-center">
          <img src="public/assets/AboutUs.png" alt="CheriGo" className="w-full h-auto" />
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-8 text-white">About Us</h1>
          <div className="bg-[#fff6e1] p-4 rounded">
            <p className="text-gray-700 mb-4">CheriGo is a fun fanmerch store handled by Cheri and Mango. You can find us during anime conventions in Malaysia!</p>
            <div className="flex justify-start space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-[#c0d763] p-2 rounded-full">
                <FaInstagram className="text-[#fff6e1] text-2xl hover:text-white transition-colors duration-300" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-[#c0d763] p-2 rounded-full">
                <FaTwitter className="text-[#fff6e1] text-2xl hover:text-white transition-colors duration-300" />
              </a>
              <a href="mailto:info@cherigo.com" className="bg-[#c0d763] p-2 rounded-full">
                <FaEnvelope className="text-[#fff6e1] text-2xl hover:text-white transition-colors duration-300" />
              </a>
            </div>
          </div>
          <div className="mt-4 flex justify-center">
            <button className="bg-[#fff6e1] text-[#eb8194] px-4 py-2 rounded hover:bg-[#eb8194] hover:text-white transition-colors duration-300 flex items-center">
              <FaStar className="mr-2" /> Portfolio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;