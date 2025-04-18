import React, { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';



const ShippingAddress = () => {
    const navigate = useNavigate();

    const [shipping, setShipping] = useState({
        name: "",
        email: "",
        address: {
            line1: "",
            line2: "",
            city: "",
            state: "",
            postal_code: "",
            country: "",
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setShipping((prop) => {
            const updatedShipping = {
                ...prop,
                address: name in prop.address ? { ...prop.address, [name]: value } : { ...prop.address },
                [name]: name in prop.address ? prop[name] : value,
            };
            return updatedShipping;
        });
    };

    return (
        <form className="p-4 bg-[#fff6e1] min-h-screen flex justify-center">
            <div className="w-full max-w-6xl mx-auto p-4 flex" style={{ margin: '0 15%' }}>
            <div className="w-1/2 pr-4">
            <h2 className="text-2xl  mb-4 font-bold  text-[#f66d76] text-[24px] font-[Dynapuff]">Shipping Address</h2>

            <label className="block  text-[#f66d76] text-[20px] font-[Dynapuff]">Full Name:</label>
            <input type="text" name="name" value={shipping.name} onChange={handleChange} className="w-full p-2 border-2 focus:border-[#f66d76] focus:outline-none rounded-2xl mb-2" />

            <label className="block  text-[#f66d76] text-[20px] font-[Dynapuff]">Email:</label>
            <input type="email" name="email" value={shipping.email} onChange={handleChange} className="w-full p-2 border-2 focus:border-[#f66d76] focus:outline-none rounded-2xl mb-2" />

            <label className="block   text-[#f66d76] text-[20px] font-[Dynapuff]">Address Line 1:</label>
            <input type="text" name="line1" value={shipping.address.line1} onChange={handleChange} className="w-full p-2 border-2 focus:border-[#f66d76] focus:outline-none rounded-2xl mb-2" />

            <label className="block  text-[#f66d76] text-[20px] font-[Dynapuff]">Address Line 2:</label>
            <input type="text" name="line2" value={shipping.address.line2} onChange={handleChange} className="w-full p-2 border-2 focus:border-[#f66d76] focus:outline-none rounded-2xl mb-2" />

            <label className="block  text-[#f66d76] text-[20px] font-[Dynapuff]">City:</label>
            <input type="text" name="city" value={shipping.address.city} onChange={handleChange} className="w-full p-2 border-2 focus:border-[#f66d76] focus:outline-none rounded-2xl mb-2" />

            <div className="flex gap-4">
                <div>
                    <label className="block text-[#f66d76] text-[20px] font-[Dynapuff] ">State:</label> 
                    <input type="text" name="state" value={shipping.address.state} onChange={handleChange} className="w-full p-2 border-2 focus:border-[#f66d76] focus:outline-none rounded-2xl mb-2 " />
                </div>
               
                <div>
                    <label className="block   text-[#f66d76] text-[20px] font-[Dynapuff]">Postal Code:</label>
                    <input type="text" name="postal_code" value={shipping.address.postal_code} onChange={handleChange} className="w-full p-2 border-2 focus:border-[#f66d76] focus:outline-none rounded-2xl mb-2" />
                </div>

            </div>
            
            <label className="block  text-[#f66d76] text-[20px] font-[Dynapuff]">Country:</label>
            <input type="text" name="country" value={shipping.address.country} onChange={handleChange} className="w-full p-2 border-2 focus:border-[#f66d76] focus:outline-none rounded-2xl mb-2" />
            </div>

            {/* right column */}
            <div className="w-1/2 pl-4">
                <div className="border-t-2 border-[#ffbd59] mb-4 my-4"></div>
                    <div className="flex justify-between items-center">
                        <span className="text-2xl font-[Dynapuff] font-bold text-[#f66d76] uppercase">Payment</span>
                        <button onClick={() => navigate('/payment', { state: { shippingData: shipping } })}
                                        className="px-2 py-2 bg-[#f66d76] text-white rounded-full hover:bg-[#eb8194] transition-colors duration-300 flex items-center">
                            <span><FaArrowRight /></span>
                        </button>
                    </div>
                <div className="border-t-2 border-[#ffbd59] mb-4 my-4"></div>
            </div>
            
            </div>
        </form>
    );
};

export default ShippingAddress;
