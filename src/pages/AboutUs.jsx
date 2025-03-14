import React from 'react';
import { FaInstagram, FaTwitter, FaEnvelope, FaStar } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <div className="w-full max-w-full  p-4 " style={{ backgroundImage: "url('/assets/bg-trans.png')", backgroundSize: 'cover'}}>
      
       {/* Left Column - Back Button */}
       <div className="w-1/12 flex items-start p-4">
        <button
            onClick={() => window.history.back()}
            className=" bg-[#ecc236] text-white rounded-full hover:bg-[#eb8194] transition-colors duration-300"
        >
            <img src='/assets/back.png' alt='back' className='h-8 '/>
        </button>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="flex justify-center items-center pl-20">
          <img src="/assets/AboutUs.png" alt="CheriGo" className="w-full h-auto" />
        </div>

        <div className="justify-center items-center">
          <h1 className="text-6xl font-bold text-white text-center font-[Dynapuff]" style={{ textShadow: '2px 2px 0 #d6e590, -2px -2px 0 #d6e590, 2px -2px 0 #d6e590, -2px 2px 0 #d6e590' }}>About Us</h1>
          <div className="p-10 justify-items-center " style={{ backgroundImage: "url('/assets/yellowboard.png')", backgroundSize: 'contain', backgroundPosition: 'center',  backgroundRepeat: 'no-repeat' }}>

            <p className="font-bold  text-[#f66d76] text-[24px] font-[Dynapuff] m-4 text-left w-80">CheriGo is a fun fanmerch store handled by Cheri and Mango.</p>
            <p className="font-bold text-[#f66d76] text-[24px] font-[Dynapuff] m-4 text-left w-80">You can find us during anime conventions in Malaysia!</p>
            <div className="flex justify-center ">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className='px-2' >
                <img src='/assets/insta.png' className='h-12 '/>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className='px-2' >
                <img src='/assets/x.png' className='h-12 '/>
              </a>
              <a href="mailto:info@cherigo.com" className='px-2'>
                <img src='/assets/mail.png' className='h-12 '/>
              </a>
            </div>
          </div>
          <div className="mt-2  justify-items-center">
            <button className="bg-[#fff6e1] text-[#eb8194] font-bold font-[Dynapuff] px-4 py-2 rounded-full hover:bg-[#eb8194] hover:text-white transition-colors duration-300 flex items-center">
              <FaStar className="mr-2" /> PORTFOLIO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;