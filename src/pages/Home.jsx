import React, { useEffect, useState } from 'react';

const Home = () => {
  return (
    <div className=" top-0 bottom-0 min-h-[600px] " style={{ backgroundImage: "url('/assets/bg-trans.png')", backgroundSize: 'cover'}}>
    <div className=" justify-center items-center px-6">
        <img src="/assets/icon.png" alt="Logo" className="justify-self-center h-[500px] pt-10 animate-[bounce_2s_ease-in-out_infinite]" />
        <p className="text-lg pb-28 text-center font-[Dynapuff] ">
        Cherigo is your one-stop shop for all your favorite anime merchandise. From keychains to standees, we have it all!
      </p>
    
    </div>

      
      {/* <div className="flex justify-center mb-8">
        <img src="/assets/hero-image.png" alt="Hero" className="w-full max-w-md rounded-lg shadow-lg" />
      </div> */}
    </div>
  );
};

export default Home;