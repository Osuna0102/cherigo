import React, { useEffect, useState } from 'react';

const Home = () => {
  return (
    <div 
      className="w-full min-h-[600px]" 
      style={{ 
        backgroundImage: "url('/assets/bg-trans.png')", 
        backgroundSize: 'contain',
        backgroundRepeat: 'repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="flex flex-col items-center justify-center px-4 sm:px-6">
        <img 
          src="/assets/icon.png" 
          alt="Logo" 
          className="w-auto h-auto max-h-[300px] sm:max-h-[400px] md:max-h-[500px] pt-10" 
        />
        <p className="text-base sm:text-lg pb-16 sm:pb-28 text-center font-[Dynapuff]">
          Cherigo is your one-stop shop for all your favorite anime merchandise. <br className="hidden sm:inline" />
          From keychains to standees, we have it all!
        </p>
      </div>
    </div>
  );
};

export default Home;