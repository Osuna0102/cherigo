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
    //const orderTotal = cartItems.reduce((total, item) => total + (item.discount ? item.price - (item.price * item.discount / 100) : item.price) * item.quantity, 0);
    const totalWithoutProcessFees = subTotal - discountedTotal;
    //processing fees according to Stripe is 3.4% + $0.50
    const processFees = (3.4/100 * totalWithoutProcessFees) + 0.50;
    const orderTotal = totalWithoutProcessFees + processFees;
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-[#fff6e1] min-h-screen flex justify-center" >
            <div className="w-full max-w-6xl mx-auto p-4 flex" style={{ margin: '0 15%' }}>
                <div className="w-1/2 pr-4">
                    <h1 className="text-4xl font-bold mb-4 text-[#f66d76]">Payment Information</h1>
                   <PaymentElement />
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
                        <button className="pay-button" disabled={isProcessing} id="submit">
                            {isProcessing ? "Processing..." : "Place Order"}
                        </button>
                    </div>
                    <div className="border-t-2 border-[#ffbd59] mb-4 my-4"></div>
                </div>
            </div>
        </form>
    );
};



export default CheckoutForm;