import React from 'react'

function PaymentSuccess() {
  return (
      <div className=" top-0 bottom-0 min-h-[400px] " style={{ backgroundImage: "url('/assets/bg-trans.png')", backgroundSize: 'cover'}}>
        <div className=" justify-items-center px-6">
          <img src="/assets/icon.png" alt="Logo" className="justify-self-center h-[300px] pt-10" />
          <p className='text-center font-[Dynapuff] font-bold text-lg text-[#f66d76]'>Thank you for your purchase!</p>


        </div>
      </div>
  )
}

export default PaymentSuccess
