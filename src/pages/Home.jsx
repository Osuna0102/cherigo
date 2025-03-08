import React, { useEffect, useState } from 'react';

const Home = () => {
  return (
    <div className=" top-0 bottom-0 min-h-[600px] " style={{ backgroundImage: "url('/assets/bg-trans.png')", backgroundSize: 'cover'}}>
    <div className=" justify-center items-center px-6">
     {/* <div className=" " >
        <p className=" font-[Dynapuff-bold] text-9xl " style={{ WebkitTextStroke: '2px #d6e590', color: 'white' }}>Cheri</p>
        <p className=" text-9xl font-[Dynapuff-bold]  " style={{ WebkitTextStroke: '2px #fff0d3', color: 'white' }}>GO!</p>
      </div>  */}
        <img src="/assets/icon.png" alt="Logo" className="justify-self-center h-[500px] pt-10" style={{ animation:' bounce 6s'}}/>
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