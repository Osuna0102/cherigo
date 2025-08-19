import React , {useEffect, useState} from 'react';
import { useOutletContext, useLocation} from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { urlFor, fetchShippingZones, getShippingFeeByCountry } from '../lib/client';
import { FaArrowRight } from 'react-icons/fa';
import { useLanguage } from '../lib/languageContext';
import './../App.css'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISH_KEY);

const CheckoutForm = () => {
    const { language } = useLanguage();
    const { cartItems } = useOutletContext();
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [message, setMessage] = useState(null);
    const [shippingFee, setShippingFee] = useState(0);
    const [shippingZoneName, setShippingZoneName] = useState('');
    const location = useLocation();
    const shippingData = location.state?.shippingData || {};

    useEffect(() => {
        const fetchFee = async () => {
            const zones = await fetchShippingZones();
            const countryCode = shippingData?.address?.country || 'MY'; // Or however you're storing user's country
            const shipping = getShippingFeeByCountry(zones, countryCode);

            setShippingFee(shipping?.fee || 0);
            setShippingZoneName(shipping?.name || 'Standard');
        };

        fetchFee();
    }, []);

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
    const orderTotal = totalWithoutProcessFees + processFees + shippingFee;
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    const localizedText = {
    paymentInfo: language === 'ja' ? '💳 お支払い情報' : '💳 Payment Info',
    orderSummary: language === 'ja' ? '🧾 注文概要' : '🧾 Order Summary',
    items: language === 'ja' ? '商品' : 'item',
    subtotal: language === 'ja' ? '小計:' : 'SubTotal:',
    discounted: language === 'ja' ?　'割引合計:' : 'Discounted Total:',
    processFee: language === 'ja' ? '処理手数料:' : 'Processing Fees:',
    total: language === 'ja' ? '合計金額' : 'Order Total',
    placeOrder: language === 'ja' ? '注文を出す' : 'Place Order',
    shipping: language === 'ja' ? '出荷' : 'Shipping',
    processing: language === 'ja' ? '処理中...' : 'Processing...',
  };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-[#fff6e1] min-h-screen flex justify-center" >
            <div className="w-full max-w-6xl mx-auto p-4 flex" style={{ margin: '0 15%' }}>
                <div className="w-1/2 pr-4">
                    <h1 className="text-4xl font-bold mb-4 text-[#f66d76]">{localizedText.paymentInfo}</h1>
                   <PaymentElement />
                </div>

                
                <div className="w-1/2 pl-4">
                    <h2 className="text-4xl font-bold mb-4 text-[#f66d76]">{localizedText.orderSummary}</h2>
                    <p className="text-xl font-bold text-[#f66d76]">{totalItems} {localizedText.items}{totalItems > 1 && language !== 'ja' ? 's' : ''}</p>
                    <div className="mt-4">
                        <div className="flex justify-between">
                            <span className="text-lg font-bold text-[#f66d76]">{localizedText.subtotal}:</span>
                            <span className="text-lg font-bold text-[#f66d76]">USD ${subTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-lg font-bold text-[#f66d76]">{localizedText.discounted}:</span>
                            <span className="text-lg font-bold text-[#f66d76]">- USD ${discountedTotal.toFixed(2)}</span>
                        </div>
                         <div className="flex justify-between">
                            <span className="text-lg font-bold text-[#f66d76]">{localizedText.processFee}:</span>
                            <span className="text-lg font-bold text-[#f66d76]">USD ${processFees.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-lg font-bold text-[#f66d76]">{localizedText.shipping} ({shippingZoneName}):</span>
                            <span className="text-lg font-bold text-[#f66d76]">USD ${shippingFee.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-lg font-bold text-[#f66d76]">{localizedText.total}:</span>
                            <span className="text-lg font-bold text-[#f66d76]">USD ${orderTotal.toFixed(2)}</span>
                        </div>
                    </div>
                    <div className="border-t-2 border-[#ffbd59] mb-4 my-4"></div>
                   
                    <div className="flex justify-between items-center">
                        <button className="pay-button" disabled={isProcessing} id="submit">
                             {isProcessing ? localizedText.processing : localizedText.placeOrder}
                        </button>

                        {message && (
                            <p className="mt-4 text-red-500 font-semibold text-sm">{message}</p>
                        )}
                    </div>
                    <div className="border-t-2 border-[#ffbd59] mb-4 my-4"></div>
                </div>
            </div>
        </form>
    );
};



export default CheckoutForm;