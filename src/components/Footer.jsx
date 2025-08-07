import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaTwitter, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer
      className="w-full p-4 bg-gray-100 text-left shadow-md bottom-0"
      style={{ backgroundImage: 'url(/assets/bg.png)', backgroundSize: 'cover' }}
    >
      <div className="container  flex flex-wrap justify-between items-center">
        <div className="w-full md:w-1/3 p-4">
          <img src="/assets/icon.png" alt="CheriGo Logo" className=" h-[250px] " />
        </div>
        <div className="w-full md:w-2/3 p-4 flex flex-wrap rounded-[40px] bg-[#fff6e1]/70">
          <div className="w-full md:w-1/3 p-4">
            <h3 className="font-bold mb-2 text-[#f66d76] text-[24px] font-glacial-indifference">CUSTOMER SERVICE</h3>
            <ul>
              <li><Link to="/contact-us" className="text-[#c0d763] text-[21px] font-glacial-indifference">Contact Us</Link></li>
              <li><Link to="/faq" className="text-[#c0d763] text-[21px] font-glacial-indifference">FAQ</Link></li>
              <li><Link to="/track-order" className="text-[#c0d763] text-[21px] font-glacial-indifference">Track Order</Link></li>
              <li><Link to="/return-order" className="text-[#c0d763] text-[21px] font-glacial-indifference">Return Order</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3 p-4">
            <h3 className="font-bold mb-2 text-[#f66d76] text-[24px] font-glacial-indifference">ABOUT US</h3>
            <ul>
              <li><Link to="/terms-conditions" className="text-[#c0d763] text-[21px] font-glacial-indifference">Terms & Conditions</Link></li>
              <li><Link to="/privacy-policy" className="text-[#c0d763] text-[21px] font-glacial-indifference">Privacy Policy</Link></li>
              <li><Link to="/promotions" className="text-[#c0d763] text-[21px] font-glacial-indifference">Promotions</Link></li>
              <li><Link to="/services" className="text-[#c0d763] text-[21px] font-glacial-indifference">Services</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3 p-4">
            <h3 className="font-bold mb-2 text-[#f66d76] text-[24px] font-glacial-indifference">FOLLOW OUR SOCIALS!</h3>
            <div className="flex justify-start space-x-4">
              <a href="https://instagram.com/cherig0" target="_blank" rel="noopener noreferrer" className="bg-[#c0d763] p-2 rounded-full">
                <FaInstagram className="text-[#fff6e1] text-2xl hover:text-white transition-colors duration-300" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-[#c0d763] p-2 rounded-full">
                <FaTwitter className="text-[#fff6e1] text-2xl hover:text-white transition-colors duration-300" />
              </a>
              <a href="mailto:cherigo715@gmail.com" className="bg-[#c0d763] p-2 rounded-full">
                <FaEnvelope className="text-[#fff6e1] text-2xl hover:text-white transition-colors duration-300" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;