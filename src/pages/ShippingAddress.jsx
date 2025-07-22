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

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const validate = () => {
        let newErrors = {};
        
        // Required fields validation
        if (!shipping.name.trim()) newErrors.name = "Name is required";
        if (!shipping.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(shipping.email)) {
            newErrors.email = "Email is invalid";
        }
        if (!shipping.address.line1.trim()) newErrors.line1 = "Address is required";
        if (!shipping.address.city.trim()) newErrors.city = "City is required";
        if (!shipping.address.state.trim()) newErrors.state = "State is required";
        if (!shipping.address.country.trim()) newErrors.country = "Country is required";
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        // Mark field as touched
        setTouched(prev => ({
            ...prev,
            [name]: true
        }));
        
        setShipping((prop) => {
            const updatedShipping = {
                ...prop,
                address: name in prop.address ? { ...prop.address, [name]: value } : { ...prop.address },
                [name]: name in prop.address ? prop[name] : value,
            };
            return updatedShipping;
        });
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched(prev => ({
            ...prev,
            [name]: true
        }));
        validate();
    };

    const handleSubmit = () => {
        const isValid = validate();
        if (isValid) {
            navigate('/payment', { state: { shippingData: shipping } });
        }
    };

    return (
        <form className="p-2 sm:p-4 bg-[#fff6e1] min-h-screen flex justify-center" onSubmit={(e) => e.preventDefault()}>
            <div className="w-full max-w-6xl mx-auto p-2 sm:p-4 flex flex-col lg:flex-row">
                {/* Form Section */}
                <div className="w-full lg:w-1/2 lg:pr-4 mb-6 lg:mb-0">
                    <h2 className="text-xl sm:text-2xl mb-4 font-bold text-[#f66d76] font-[Dynapuff]">Shipping Address</h2>

                    <label className="block text-[#f66d76] text-base sm:text-lg font-[Dynapuff]">
                        Full Name: <span className="text-red-500">*</span>
                    </label>
                    <input 
                        type="text" 
                        name="name" 
                        value={shipping.name} 
                        onChange={handleChange} 
                        onBlur={handleBlur}
                        className={`w-full p-2 border-2 ${touched.name && errors.name ? 'border-red-500' : 'focus:border-[#f66d76]'} focus:outline-none rounded-2xl mb-2`} 
                    />
                    {touched.name && errors.name && <p className="text-red-500 text-sm mb-2">{errors.name}</p>}

                    <label className="block text-[#f66d76] text-base sm:text-lg font-[Dynapuff]">
                        Email: <span className="text-red-500">*</span>
                    </label>
                    <input 
                        type="email" 
                        name="email" 
                        value={shipping.email} 
                        onChange={handleChange} 
                        onBlur={handleBlur}
                        className={`w-full p-2 border-2 ${touched.email && errors.email ? 'border-red-500' : 'focus:border-[#f66d76]'} focus:outline-none rounded-2xl mb-2`} 
                    />
                    {touched.email && errors.email && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}

                    <label className="block text-[#f66d76] text-base sm:text-lg font-[Dynapuff]">
                        Address Line 1: <span className="text-red-500">*</span>
                    </label>
                    <input 
                        type="text" 
                        name="line1" 
                        value={shipping.address.line1} 
                        onChange={handleChange} 
                        onBlur={handleBlur}
                        className={`w-full p-2 border-2 ${touched.line1 && errors.line1 ? 'border-red-500' : 'focus:border-[#f66d76]'} focus:outline-none rounded-2xl mb-2`} 
                    />
                    {touched.line1 && errors.line1 && <p className="text-red-500 text-sm mb-2">{errors.line1}</p>}

                    <label className="block text-[#f66d76] text-base sm:text-lg font-[Dynapuff]">
                        Address Line 2: <span className="text-gray-400">(optional)</span>
                    </label>
                    <input 
                        type="text" 
                        name="line2" 
                        value={shipping.address.line2} 
                        onChange={handleChange}
                        className="w-full p-2 border-2 focus:border-[#f66d76] focus:outline-none rounded-2xl mb-2" 
                    />

                    <label className="block text-[#f66d76] text-base sm:text-lg font-[Dynapuff]">
                        City: <span className="text-red-500">*</span>
                    </label>
                    <input 
                        type="text" 
                        name="city" 
                        value={shipping.address.city} 
                        onChange={handleChange} 
                        onBlur={handleBlur}
                        className={`w-full p-2 border-2 ${touched.city && errors.city ? 'border-red-500' : 'focus:border-[#f66d76]'} focus:outline-none rounded-2xl mb-2`} 
                    />
                    {touched.city && errors.city && <p className="text-red-500 text-sm mb-2">{errors.city}</p>}

                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                        <div className="w-full sm:w-1/2">
                            <label className="block text-[#f66d76] text-base sm:text-lg font-[Dynapuff]">
                                State: <span className="text-red-500">*</span>
                            </label> 
                            <input 
                                type="text" 
                                name="state" 
                                value={shipping.address.state} 
                                onChange={handleChange} 
                                onBlur={handleBlur}
                                className={`w-full p-2 border-2 ${touched.state && errors.state ? 'border-red-500' : 'focus:border-[#f66d76]'} focus:outline-none rounded-2xl mb-2`} 
                            />
                            {touched.state && errors.state && <p className="text-red-500 text-sm mb-2">{errors.state}</p>}
                        </div>
                    
                        <div className="w-full sm:w-1/2">
                            <label className="block text-[#f66d76] text-base sm:text-lg font-[Dynapuff]">
                                Postal Code: <span className="text-gray-400">(optional)</span>
                            </label>
                            <input 
                                type="text" 
                                name="postal_code" 
                                value={shipping.address.postal_code} 
                                onChange={handleChange}
                                className="w-full p-2 border-2 focus:border-[#f66d76] focus:outline-none rounded-2xl mb-2" 
                            />
                        </div>
                    </div>
                    
                    <label className="block text-[#f66d76] text-base sm:text-lg font-[Dynapuff]">
                        Country: <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="country"
                        value={shipping.address.country}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full p-2 border-2 ${touched.country && errors.country ? 'border-red-500' : 'focus:border-[#f66d76]'} focus:outline-none rounded-2xl mb-2`}
                    >
                        <option value="">-- Select a Country --</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="GB">United Kingdom</option>
                        <option value="JP">Japan</option>
                        <option value="AU">Australia</option>
                        <option value="DE">Germany</option>
                        <option value="FR">France</option>
                        <option value="PH">Philippines</option>
                        <option value="SG">Singapore</option>
                        <option value="MY">Malaysia</option>
                        <option value="IN">India</option>
                        <option value="KR">South Korea</option>
                        <option value="VN">Vietnam</option>
                        <option value="CO">Colombia</option>
                    </select>
                    {touched.country && errors.country && <p className="text-red-500 text-sm mb-2">{errors.country}</p>}

                </div>

                {/* Payment Section */}
                <div className="w-full lg:w-1/2 lg:pl-4">
                    <div className="border-t-2 border-[#ffbd59] mb-4 my-4"></div>
                    <div className="flex justify-between items-center">
                        <span className="text-xl sm:text-2xl font-[Dynapuff] font-bold text-[#f66d76] uppercase">Payment</span>
                        <button 
                            onClick={handleSubmit}
                            className="p-2 sm:p-3 bg-[#f66d76] text-white rounded-full hover:bg-[#eb8194] transition-colors duration-300 flex items-center justify-center">
                            <FaArrowRight className="text-sm sm:text-base" />
                        </button>
                    </div>
                    <div className="border-t-2 border-[#ffbd59] mb-4 my-4"></div>
                </div>
            </div>
        </form>
    );
};

export default ShippingAddress;