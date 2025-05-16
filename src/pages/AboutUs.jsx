import React from 'react';
import { FaInstagram, FaTwitter, FaEnvelope, FaStar } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <div className="w-full h-[900px] p-2 sm:p-4" style={{ backgroundImage: "url('/assets/bg-trans.png')", backgroundSize: 'cover'}}>
      <div className="max-w-[1400px] mx-auto min-h-screen flex flex-col">
        {/* Back Button - Always at top */}
        <div className="flex items-start mb-4 sm:mb-8">
          <button
            onClick={() => window.history.back()}
            className="bg-[#ecc236] text-white rounded-full hover:bg-[#eb8194] transition-colors duration-300"
          >
            <img src='/assets/back.png' alt='back' className='h-6 sm:h-8'/>
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 flex-grow">
          {/* Left Column - Image */}
          <div className="flex flex-col items-center">
            <img src="/assets/AboutUs.png" alt="CheriGo" className="w-full max-w-md h-auto" />
          </div>

          {/* Right Column - Content */}
          <div className="flex flex-col items-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white text-center font-[Dynapuff] mb-4" 
                style={{ textShadow: '2px 2px 0 #d6e590, -2px -2px 0 #d6e590, 2px -2px 0 #d6e590, -2px 2px 0 #d6e590' }}>
              About Us
            </h1>
            
            {/* Yellow Board Content with proper text containment */}
            <div className="relative w-full max-w-lg mx-auto">
              <div className="w-full pb-[80%] sm:pb-[75%] md:pb-[65%]"> {/* Creates space for the background */}
                <div 
                  className="absolute inset-0 bg-no-repeat bg-center bg-contain"
                  style={{ backgroundImage: "url('/assets/yellowboard.png')" }}>
                </div>
                
                {/* Content container with carefully calculated padding to stay within visible board area */}
                <div className="absolute inset-0 flex flex-col items-center justify-center px-[12%] py-[15%] sm:px-[18%] sm:py-[15%] md:px-[20%] md:py-[12%]">
                  <p className="font-bold text-[#f66d76] text-base sm:text-lg md:text-xl font-[Dynapuff] mb-2 sm:mb-3 md:mb-4 text-center leading-tight">
                    CheriGo is a fun fanmerch store handled by Cheri and Mango.
                  </p>
                  
                  <p className="font-bold text-[#f66d76] text-base sm:text-lg md:text-xl font-[Dynapuff] mb-3 sm:mb-4 text-center leading-tight">
                    You can find us during anime conventions in Malaysia!
                  </p>
                  
                  {/* Social Icons - positioned at the bottom portion of the board */}
                  <div className="flex justify-center space-x-3 sm:space-x-4 md:space-x-5 mt-auto">
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                      <img src='/assets/insta.png' className='h-10 sm:h-8 md:h-9'/>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                      <img src='/assets/x.png' className='h-10 sm:h-8 md:h-9'/>
                    </a>
                    <a href="mailto:info@cherigo.com">
                      <img src='/assets/mail.png' className='h-10 sm:h-8 md:h-9'/>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Portfolio Button */}
            <div className="mt-4 sm:mt-6">
              <button className="bg-[#fff6e1] text-[#eb8194] font-bold font-[Dynapuff] px-4 py-2 sm:px-5 sm:py-2 rounded-full hover:bg-[#eb8194] hover:text-white transition-colors duration-300 flex items-center text-base sm:text-lg">
                <FaStar className="mr-2 sm:mr-3" /> PORTFOLIO
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;