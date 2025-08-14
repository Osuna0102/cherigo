import React from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { urlFor } from '../lib/client';
import { FaArrowRight } from 'react-icons/fa';
import { useLanguage } from '../lib/languageContext';


const ShoppingCart = () => {
    const { cartItems, removeFromCart } = useOutletContext();
    const navigate = useNavigate();
    const {language} = useLanguage();
    
    const subTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const discountedTotal = cartItems.reduce((total, item) => total + (item.discount ? (item.price * item.discount / 100) : 0) * item.quantity, 0);
    const totalWithoutProcessFees = subTotal - discountedTotal;
    //processing fees according to Stripe is 3.4% + $0.50
    const processFees = (3.4/100 * totalWithoutProcessFees) + 0.50;
    const orderTotal = totalWithoutProcessFees + processFees;
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <div className="p-2 sm:p-4 bg-[#fff6e1] min-h-screen flex justify-center" style={{ backgroundImage: "url('/assets/shop-bg.png')", backgroundSize: 'cover'}}>
            <div className="w-full max-w-[1400px] mx-auto p-2 sm:p-4">
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Cart Items - Full width on mobile, half width on large screens */}
                    <div className="w-full lg:w-1/2 lg:pr-4">
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-[#f66d76]">Shopping Cart</h1>
                        
                        {cartItems.length === 0 ? (
                            <div className="text-lg text-[#f66d76] font-bold">Your cart is empty</div>
                        ) : (
                            <div>
                                {cartItems.map((item, index) => {
                                    const discountedPrice = item.discount ? item.price - (item.price * item.discount / 100) : item.price;
                                    return (
                                        <div key={index}>
                                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
                                                <div className="flex items-center w-full sm:w-auto">
                                                    <img 
                                                        src={urlFor(item.image[0])} 
                                                        alt={item.name[language]} 
                                                        className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg bg-[#ffbdbf]" 
                                                    />
                                                    <div className="ml-4 flex-1">
                                                        <h2 className="font-bold text-sm sm:text-base text-[#f66d76]">{item.name[language]}</h2>
                                                        {item.discount && (
                                                            <div className="text-red-500 line-through text-xs sm:text-sm">${item.price.toFixed(2)}</div>
                                                        )}
                                                        <p className="text-gray-700 font-bold text-xs sm:text-sm">${discountedPrice.toFixed(2)} each</p>
                                                        {item.selectedChoice && 
                                                            <p className="text-gray-700 text-xs sm:text-sm">Choice: {item.selectedChoice}</p>
                                                        }
                                                        <p className="text-gray-700 text-xs sm:text-sm">Quantity: {item.quantity}</p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart({product: item, choice: item.selectedChoice, quantity: item.quantity})}
                                                    className="px-3 py-1 sm:px-4 sm:py-2 mt-2 sm:mt-0 bg-[#f66d76] text-white text-xs sm:text-sm rounded-lg hover:bg-[#eb8194] transition-colors duration-300"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                            <div className="border-t-2 border-[#ffbd59] mb-4 my-4"></div>
                                        </div>
                                    );
                                })}
                                <button 
                                    onClick={() => {localStorage.clear(); window.location.reload();}} 
                                    className="px-3 py-1 sm:px-4 sm:py-2 bg-[#f66d76] text-white text-xs sm:text-sm rounded-lg hover:bg-[#eb8194] transition-colors duration-300"
                                >
                                    Empty Cart
                                </button>
                            </div>
                        )}
                    </div>


                    {   /* right column */}
                    <div className="w-full lg:w-1/2 lg:pl-4 mt-6 lg:mt-0">
                        <h2 className="text-4xl font-bold mb-4 text-[#f66d76]">Order Summary</h2>
                        <p className="text-xl font-bold text-[#f66d76]">{totalItems} items</p>
                        <div className="mt-4">
                            <div className="flex justify-between">
                                <span className="text-lg font-bold text-[#f66d76]">SubTotal:</span>
                                <span className="text-lg font-bold text-[#f66d76]">${subTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-lg font-bold text-[#f66d76]">Discounted Total:</span>
                                <span className="text-lg font-bold text-[#f66d76]">- ${discountedTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-lg font-bold text-[#f66d76]">Processing Fees:</span>
                                <span className="text-lg font-bold text-[#f66d76]">${processFees.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-lg font-bold text-[#f66d76]">Order Total:</span>
                                <span className="text-lg font-bold text-[#f66d76]">${orderTotal.toFixed(2)}</span>
                            </div>
                        </div>
                        <div className="border-t-2 border-[#ffbd59] mb-4 my-4"></div>
                        
                        <div className="flex justify-between items-center">
                            <span className="text-xl sm:text-2xl font-bold text-[#f66d76]">Checkout</span>
                            <button
                                onClick={() => navigate('/shippingaddr')}
                                className="p-2 sm:p-3 bg-[#f66d76] text-white rounded-full hover:bg-[#eb8194] transition-colors duration-300 flex items-center justify-center"
                                disabled={cartItems.length === 0}
                            >
                                <FaArrowRight className="text-sm sm:text-base" />
                            </button>
                        </div>
                        
                        <div className="border-t-2 border-[#ffbd59] mb-4 my-4"></div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ShoppingCart;