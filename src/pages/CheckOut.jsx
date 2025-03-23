import React , {useEffect, useState} from 'react';
import { useOutletContext } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { urlFor } from '../lib/client';
import { FaArrowRight } from 'react-icons/fa';
import './../App.css'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISH_KEY);

const CheckoutForm = () => {
    const { cartItems } = useOutletContext();
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [message, setMessage] = useState(null);
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);

        const {error} = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/success`
            },
        });

        if (error) {
            setMessage(error.message);
        }

        setIsProcessing(false);

        
    };

    const subTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const discountedTotal = cartItems.reduce((total, item) => total + (item.discount ? (item.price * item.discount / 100) : 0) * item.quantity, 0);
    const orderTotal = cartItems.reduce((total, item) => total + (item.discount ? item.price - (item.price * item.discount / 100) : item.price) * item.quantity, 0);
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-[#fff6e1] min-h-screen flex justify-center" >
            <div className="w-full max-w-6xl mx-auto p-4 flex" style={{ margin: '0 15%' }}>
                <div className="w-1/2 pr-4">
                    <h1 className="text-4xl font-bold mb-4 text-[#f66d76]">Payment Information</h1>
                   <PaymentElement />
               <button className="pay-button" disabled={isProcessing} id="submit">
                {isProcessing ? "Processing..." : "Pay"}
                </button>

                </div>
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
                            <span className="text-lg font-bold text-[#f66d76]">${discountedTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-lg font-bold text-[#f66d76]">Order Total:</span>
                            <span className="text-lg font-bold text-[#f66d76]">${orderTotal.toFixed(2)}</span>
                        </div>
                    </div>
                    <div className="border-t-2 border-[#ffbd59] mb-4 my-4"></div>
                    {/* <div>
                        {cartItems.map((item, index) => {
                            const discountedPrice = item.discount ? item.price - (item.price * item.discount / 100) : item.price;
                            return (
                                <div key={index} className="flex items-center justify-between mb-4">
                                    <img src={urlFor(item.image[0])} alt={item.name} className="w-16 h-16 object-cover rounded-lg bg-[#ffbdbf]" />
                                    <div className="flex-1 ml-4">
                                        <h2 className="text-xl font-bold">{item.name}</h2>
                                        <p className="text-gray-700">Quantity: {item.quantity}</p>
                                        {item.discount && (
                                            <div className="text-red-500 line-through">${item.price.toFixed(2)}</div>
                                        )}
                                        <p className="text-gray-700">${discountedPrice.toFixed(2)} each</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div> */}
                    <div className="mt-8 flex justify-between items-center">
                        <span className="text-2xl font-bold text-[#f66d76]">Payment</span>
                        <button
                            type="submit"
                            disabled={!stripe}
                            className="px-4 py-2 bg-[#f66d76] text-white rounded-lg hover:bg-[#eb8194] transition-colors duration-300 flex items-center"
                        >
                            <span className="ml-2"><FaArrowRight></FaArrowRight></span>
                        </button>
                    </div>
                    <div className="border-t-2 border-[#ffbd59] mb-4 my-4"></div>
                </div>
            </div>
        </form>
    );
};



export default CheckoutForm;