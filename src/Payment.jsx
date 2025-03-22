import React , {useEffect, useState} from 'react';
import { Elements } from '@stripe/react-stripe-js';

import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './pages/CheckOut';

const Payment = (props) => {

    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState("");
    const SERVER_DOMAIN = 'http://localhost:5000';


    useEffect(() => {
        fetch(`${SERVER_DOMAIN}/config`).then(async (r) => {
            const {publishableKey} = await r.json();
            setStripePromise(loadStripe(publishableKey));
        });
    }, []);

    useEffect(() => {
        fetch(`${SERVER_DOMAIN}/create-checkout-session`, {
            method: "POST",
            body: JSON.stringify({}),
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