import React from 'react';
import { FaInstagram, FaEnvelope, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

const ContactUs = () => {
  return (
    <div className="w-full min-h-screen p-2 sm:p-4" style={{ backgroundImage: "url('/assets/bg-trans.png')", backgroundSize: 'cover'}}>
      <div className="max-w-[1400px] mx-auto min-h-screen flex flex-col">
        {/* Back Button */}
        <div className="flex items-start mb-4 sm:mb-8">
          <button
            onClick={() => window.history.back()}
            className="bg-[#ecc236] text-white rounded-full hover:bg-[#eb8194] transition-colors duration-300"
          >
            <img src='/assets/back.png' alt='back' className='h-6 sm:h-8'/>
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 flex-grow">
          {/* Left Column - Contact Information */}
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white text-center font-[Dynapuff] mb-6" 
                style={{ textShadow: '2px 2px 0 #d6e590, -2px -2px 0 #d6e590, 2px -2px 0 #d6e590, -2px 2px 0 #d6e590' }}>
              Contact Us
            </h1>
            
            {/* Contact Info Cards */}
            <div className="space-y-4 w-full max-w-md">
              {/* Email Card */}
              <div className="bg-[#fff6e1] rounded-2xl p-6 shadow-lg border-2 border-[#f66d76]">
                <div className="flex items-center space-x-4">
                  <div className="bg-[#f66d76] p-3 rounded-full">
                    <FaEnvelope className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#f66d76] font-[Dynapuff] text-lg">Email</h3>
                    <a href="mailto:cherigo715@gmail.com" className="text-[#c0d763] font-[Dynapuff] hover:underline">
                      cherigo715@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Instagram Card */}
              <div className="bg-[#fff6e1] rounded-2xl p-6 shadow-lg border-2 border-[#f66d76]">
                <div className="flex items-center space-x-4">
                  <div className="bg-[#f66d76] p-3 rounded-full">
                    <FaInstagram className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#f66d76] font-[Dynapuff] text-lg">Instagram</h3>
                    <a href="https://instagram.com/cherig0" target="_blank" rel="noopener noreferrer" 
                       className="text-[#c0d763] font-[Dynapuff] hover:underline">
                      @cherig0
                    </a>
                  </div>
                </div>
              </div>

              {/* Opening Hours Card */}
              <div className="bg-[#fff6e1] rounded-2xl p-6 shadow-lg border-2 border-[#f66d76]">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#f66d76] p-3 rounded-full">
                    <FaClock className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#f66d76] font-[Dynapuff] text-lg">Opening Hours</h3>
                    <p className="text-[#c0d763] font-[Dynapuff]">7am - 9pm (GMT+8)</p>
                    <p className="text-[#c0d763] font-[Dynapuff] text-sm mt-1">
                      We typically respond within 24 hours, daily.
                    </p>
                  </div>
                </div>
              </div>

              {/* Convention Info Card */}
              <div className="bg-[#fff6e1] rounded-2xl p-6 shadow-lg border-2 border-[#f66d76]">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#f66d76] p-3 rounded-full">
                    <FaMapMarkerAlt className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#f66d76] font-[Dynapuff] text-lg">Find Us</h3>
                    <p className="text-[#c0d763] font-[Dynapuff]">
                      You can find us during anime conventions in Malaysia!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form or Additional Info */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-full max-w-lg mx-auto">
              <div className="w-full pb-[80%] sm:pb-[75%] md:pb-[65%]">
                <div 
                  className="absolute inset-0 bg-no-repeat bg-center bg-contain"
                  style={{ backgroundImage: "url('/assets/yellowboard.png')" }}>
                </div>
                
                {/* Content container */}
                <div className="absolute inset-0 flex flex-col items-center justify-center px-[12%] py-[15%] sm:px-[18%] sm:py-[15%] md:px-[20%] md:py-[12%]">
                  <div className="text-center">
                    <h2 className="font-bold text-[#f66d76] text-lg sm:text-xl md:text-2xl font-[Dynapuff] mb-4">
                      Get in Touch!
                    </h2>
                    
                    <p className="font-bold text-[#f66d76] text-sm sm:text-base md:text-lg font-[Dynapuff] mb-4 leading-tight">
                      Have questions about our products or need help with your order?
                    </p>
                    
                    <p className="font-bold text-[#f66d76] text-sm sm:text-base md:text-lg font-[Dynapuff] mb-6 leading-tight">
                      We'd love to hear from you!
                    </p>
                    
                    {/* Quick Contact Buttons */}
                    <div className="space-y-3">
                      <a href="mailto:cherigo715@gmail.com" 
                         className="block bg-[#c0d763] text-white font-bold font-[Dynapuff] px-4 py-2 rounded-full hover:bg-[#a6d353] transition-colors duration-300 text-sm sm:text-base">
                        Send Email
                      </a>
                      <a href="https://instagram.com/cherig0" target="_blank" rel="noopener noreferrer"
                         className="block bg-[#f66d76] text-white font-bold font-[Dynapuff] px-4 py-2 rounded-full hover:bg-[#eb8194] transition-colors duration-300 text-sm sm:text-base">
                        DM on Instagram
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
