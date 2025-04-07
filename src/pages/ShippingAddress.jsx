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

    // Automatically send updated shipping details to parent component
   /* useEffect(() => {
        onShippingChange(shipping);
    }, [shipping, onShippingChange]);*/

    return (
        <form className="p-4 bg-[#fff6e1] min-h-screen flex justify-center">
            <div className="w-full max-w-6xl mx-auto p-4 flex" style={{ margin: '0 15%' }}>
            <div className="w-1/2 pr-4">
            <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>

            <label className="block mb-2">Full Name:</label>
            <input type="text" name="name" value={shipping.name} onChange={handleChange} className="w-full p-2 border rounded mb-4" />

            <label className="block mb-2">Email:</label>
            <input type="email" name="email" value={shipping.email} onChange={handleChange} className="w-full p-2 border rounded mb-4" />

            <label className="block mb-2">Address Line 1:</label>
            <input type="text" name="line1" value={shipping.address.line1} onChange={handleChange} className="w-full p-2 border rounded mb-4" />

            <label className="block mb-2">Address Line 2:</label>
            <input type="text" name="line2" value={shipping.address.line2} onChange={handleChange} className="w-full p-2 border rounded mb-4" />

            <label className="block mb-2">City:</label>
            <input type="text" name="city" value={shipping.address.city} onChange={handleChange} className="w-full p-2 border rounded mb-4" />

            <label className="block mb-2">State:</label>
            <input type="text" name="state" value={shipping.address.state} onChange={handleChange} className="w-full p-2 border rounded mb-4" />

            <label className="block mb-2">Postal Code:</label>
            <input type="text" name="postal_code" value={shipping.address.postal_code} onChange={handleChange} className="w-full p-2 border rounded mb-4" />

            <label className="block mb-2">Country:</label>
            <input type="text" name="country" value={shipping.address.country} onChange={handleChange} className="w-full p-2 border rounded mb-4" />
            </div>

            {/* right column */}
            <div className="w-1/2 pl-4">
                <div className="border-t-2 border-[#ffbd59] mb-4 my-4"></div>
                    <div className="mt-8 flex justify-between items-center">
                        <span className="text-2xl font-bold text-[#f66d76]">Checkout</span>
                        <button onClick={() => navigate('/payment', { state: { shippingData: shipping } })}
                                        className="px-4 py-2 bg-[#f66d76] text-white rounded-lg hover:bg-[#eb8194] transition-colors duration-300 flex items-center">
                            <span className="ml-2"><FaArrowRight /></span>
                        </button>
                    </div>
                <div className="border-t-2 border-[#ffbd59] mb-4 my-4"></div>
            </div>
            
            </div>
        </form>
    );
};

export default ShippingAddress;
