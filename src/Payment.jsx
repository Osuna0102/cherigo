import React , {useEffect, useState} from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { useOutletContext } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './pages/CheckOut';

const Payment = (props) => {

    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState("");
    const SERVER_DOMAIN = 'http://localhost:5000';

    const { cartItems } = useOutletContext();
    
    const userEmail = "hidaya96daya@gmail.com";
    const shippingDetails = {
        name: "John Doe",
        address: {
            line1: "123 Main St",
            line2: "",
            city: "New York",
            state: "NY",
            postal_code: "10001",
            country: "US",
        },
    };

    useEffect(() => {
        fetch(`${SERVER_DOMAIN}/config`).then(async (r) => {
            const {publishableKey} = await r.json();
            setStripePromise(loadStripe(publishableKey));
        });
    }, []);

    useEffect(() => {
        fetch(`${SERVER_DOMAIN}/create-checkout-session`, {
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
            <Elements stripe={stripePromise} options={{clientSecret}}>
                <CheckoutForm />
            </Elements>
        )};
        
        </>
       
    );
};

export default Payment;