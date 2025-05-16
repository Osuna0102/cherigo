import React from 'react'

function PaymentSuccess() {
  return (
      <div className=" top-0 bottom-0 min-h-[400px] " style={{ backgroundImage: "url('/assets/success.png')", backgroundSize: 'cover'}}>
        <div className=" justify-items-center px-6">
          <img src="/assets/icon.png" alt="Logo" className="justify-self-center h-[300px] pt-10" />
          <p className='text-center font-[Dynapuff] font-bold text-lg text-[#f66d76]'>Thank you for your purchase!</p>
          <Link
                    to="/"
                    className="flex items-center justify-center bg-[#fff6e1] font-[Dynapuff] text-[#eb8194] px-2 sm:px-3 md:px-4 py-1 sm:py-2 md:py-3 rounded-full hover:bg-[#eb8194] hover:text-white transition-colors duration-300"
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
