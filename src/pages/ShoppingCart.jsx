import React from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { urlFor } from '../lib/client';
import { FaArrowRight } from 'react-icons/fa';

const ShoppingCart = () => {
    const { cartItems, removeFromCart } = useOutletContext();
    const navigate = useNavigate();
    
    const subTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const discountedTotal = cartItems.reduce((total, item) => total + (item.discount ? (item.price * item.discount / 100) : 0) * item.quantity, 0);
    const orderTotal = subTotal - discountedTotal;
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);


    return (
        <div className="p-4 bg-[#fff6e1] min-h-screen flex justify-center "  style={{ backgroundImage: "url('/assets/shop-bg.png')", backgroundSize: 'cover'}}>
            <div className="w-full max-w-6xl mx-auto p-4 flex" style={{ margin: '0 15%' }}>
                <div className="w-1/2 pr-4">
                    <h1 className="text-4xl font-bold mb-4 text-[#f66d76]">Shopping Cart</h1>
                    {cartItems.length === 0 ? (
                        <div>Your cart is empty</div>
                    ) : (
                        <div>
                            {cartItems.map((item, index) => {
                                const discountedPrice = item.discount ? item.price - (item.price * item.discount / 100) : item.price;
                                return (
                                    <div key={index}>
                                        <div className="flex items-center justify-between mb-4">
                                            <img src={urlFor(item.image[0])} alt={item.name} className="w-16 h-16 object-cover rounded-lg bg-[#ffbdbf]" />
                                            <div className="flex-1 ml-4">
                                                <h2 className="font-bold text-[#f66d76]">{item.name}</h2>

                                                {item.discount && (
                                                    <div className="text-red-500 line-through ">${item.price.toFixed(2)}</div>
                                                )}
                                                <p className="text-gray-700 font-bold ">${discountedPrice.toFixed(2)} each</p>
                                                {item.selectedChoice && <p className="text-gray-700">Choice: {item.selectedChoice}</p>}

                                                <p className="text-gray-700">Quantity: {item.quantity}</p>

                                            </div>
                                            <button
                                                onClick={() => removeFromCart({product: item, choice: item.selectedChoice, quantity: item.quantity})}
                                                className="px-4 py-2 bg-[#f66d76] text-white rounded-lg hover:bg-[#eb8194] transition-colors duration-300"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                        <div className="border-t-2 border-[#ffbd59] mb-4 my-4"></div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* right column */}
                <div className="w-1/2 pl-4">
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
                            <span className="text-lg font-bold text-[#f66d76]">Order Total:</span>
                            <span className="text-lg font-bold text-[#f66d76]">${orderTotal.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="border-t-2 border-[#ffbd59] mb-4 my-4"></div>
                    <div className="mt-8 flex justify-between items-center">
                        <span className="text-2xl font-bold text-[#f66d76]">Checkout</span>
                        <button
                            onClick={() => navigate('/payment')}
                            className="px-4 py-2 bg-[#f66d76] text-white rounded-lg hover:bg-[#eb8194] transition-colors duration-300 flex items-center"
                        >
                        <span className="ml-2"><FaArrowRight></FaArrowRight></span>
                        </button>
                    </div>
                    <div className="border-t-2 border-[#ffbd59] mb-4 my-4"></div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;