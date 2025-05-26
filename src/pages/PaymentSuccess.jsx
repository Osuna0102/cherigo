import React from 'react'
import { Link } from 'react-router-dom'
import { FaHome } from 'react-icons/fa'

function PaymentSuccess() {
  return (
      <div className=" top-0 bottom-0 min-h-[400px] " style={{ backgroundImage: "url('/assets/success.png')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className=" justify-items-center px-6 py-40">
          <p className='font-[Dynapuff] font-bold text-lg text-[#f66d76] py-4'>Thank you for your purchase!</p>
          <Link
                    to="/"
                    className="flex items-center justify-center bg-[#a6d353] font-[Dynapuff] text-white px-6 sm:px-6 md:px-8 py-1 sm:py-1 md:py-1 rounded-full hover:bg-white hover:text-[#a6d353]  transition-colors duration-300"
                    aria-label="Home"
                  >
                    <FaHome className="w-6 h-6 sm:w-8 sm:h-8 md:w-8 md:h-8" />
                    <span className="ml-1 text-xs sm:text-sm md:text-base hidden sm:inline">Home</span>
          </Link>

        </div>
      </div>
  )
}

export default PaymentSuccess
