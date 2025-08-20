import React , {useEffect, useState} from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { useOutletContext, useLocation } from "react-router-dom";
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './pages/CheckOut';
import ShippingAddress from './pages/ShippingAddress';
import { useLanguage } from './lib/languageContext';


const Payment = (props) => {

    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState("");
    const SERVER_DOMAIN = import.meta.env.VITE_BACKEND_DOMAIN;
    const {language} = useLanguage();


    const { cartItems } = useOutletContext();
    const location = useLocation();
    const shippingData = location.state?.shippingData || {};

    useEffect(() => {
        console.log("Received Shipping Data:", shippingData);
    }, [shippingData]);

    
    const userEmail = shippingData.email;
    const shippingDetails = {
        name: shippingData.name,
        address: {
            line1: shippingData.address?.line1 || "",
            line2: shippingData.address?.line2 || "",
            city: shippingData.address?.city || "",
            state: shippingData.address?.state || "",
            postal_code: shippingData.address?.postal_code || "",
            country: shippingData.address?.country || "",
        },
    };

    const stripeOptions = {
        clientSecret,
        locale: language === 'ja' ? 'ja' : 'en', // <- Enable Japanese UI
    };

    useEffect(() => {
        fetch(`${SERVER_DOMAIN}config`).then(async (r) => {
            const {publishableKey} = await r.json();
            setStripePromise(loadStripe(publishableKey));
        });
    }, []);

    useEffect(() => {
        fetch(`${SERVER_DOMAIN}create-checkout-session`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                cartItems,
                email: userEmail,
                shipping: shippingDetails,
            }),
        }).then(async (r) => {
            const { clientSecret } = await r.json();

            setClientSecret(clientSecret);

        });
    }, []);

    return (
        <>
        {stripePromise && clientSecret && (
            <Elements stripe={stripePromise} options={stripeOptions}>
                <CheckoutForm />
            </Elements>
        )};
        
        </>
       
    );
};

export default Payment;