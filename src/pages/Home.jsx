import React, { useEffect, useState } from 'react';

const Home = () => {
  return (
    <div className="w-full max-w-full  p-8 bg-[#fff6e1]">
      <h1 className="text-4xl font-bold mb-8 text-center">Welcome to Cherigo</h1>
      <p className="text-lg mb-4 text-center">
        Cherigo is your one-stop shop for all your favorite anime merchandise. From keychains to standees, we have it all!
      </p>
      {/* <div className="flex justify-center mb-8">
        <img src="/assets/hero-image.png" alt="Hero" className="w-full max-w-md rounded-lg shadow-lg" />
      </div> */}
    </div>
  );
};

export default Home;