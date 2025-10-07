import express from "express";
import Stripe from "stripe";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from '@sanity/client';
import { fetchShippingZones, getShippingFeeByCountry } from "./client.js";

dotenv.config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const sanityClient = createClient({
  projectId: 'h21935xi',
  dataset: 'production',
  useCdn: false, // for writes
  apiVersion: '2023-05-03',
  token: process.env.SANITY_AUTH_TOKEN
});

app.use(express.json());
app.use(cors()); // Allow frontend requests


app.get("/config", (req, res) => {
    res.send({
        publishableKey: process.env.STRIPE_PUBLISH_KEY
    });
});

// Create a payment intent
app.post("/create-checkout-session", async (req, res) => {
    console.log(req.body)
    try {
        const { cartItems, email, shipping } = req.body;  // Get amount from frontend
        const userCountryCode = shipping?.address?.country; 
        
        // Fetch shipping zones (if needed dynamically)
        const shippingZones = await fetchShippingZones();
        const shippingFee = getShippingFeeByCountry(shippingZones, userCountryCode);
        if (!shippingFee) {
            return res.status(400).json({ error: `No shipping zone found for country code: ${userCountryCode}` });
        }

        const subTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
        const discountedTotal = cartItems.reduce((total, item) => total + (item.discount ? (item.price * item.discount / 100) : 0) * item.quantity, 0);
        //const orderTotal = cartItems.reduce((total, item) => total + (item.discount ? item.price - (item.price * item.discount / 100) : item.price) * item.quantity, 0);
         const totalWithoutProcessFees = subTotal - discountedTotal;
        //processing fees according to Stripe is 3.4% + $0.50
        const processFees = (3.4/100 * totalWithoutProcessFees) + 0.50;
        const orderTotal = totalWithoutProcessFees + processFees + shippingFee.fee;
        const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

        const groupedCartItems = [];

        cartItems.forEach(item => {
        const existing = groupedCartItems.find(group => group.productname === item.name);
        const choiceData = {
            selectedchoice: item.selectedChoice,
            quantity: item.quantity,
        };

        if (existing) {
            existing.choices.push(choiceData);
        } else {
            groupedCartItems.push({
                productname: item.name,
                choices: [choiceData],
                //totalprice: orderTotal,
                discounted: item.discount,
            });
        }
        });




        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(orderTotal * 100), // convert to integer cents
            currency: "usd",
            receipt_email: email, // Send receipt to the user
            shipping: {
                name: shipping.name,
                address: {
                    line1: shipping.address.line1,
                    line2: shipping.address.line2 || "",
                    city: shipping.address.city,
                    state: shipping.address.state,
                    postal_code: shipping.address.postal_code,
                    country: shipping.address.country,
                },
            },
            metadata: {
                cartItems: JSON.stringify(groupedCartItems), // Store cart items
                userEmail: email, // Store user email
            },
            automatic_payment_methods: {
                enabled: true,
            },
        });
        console.log(groupedCartItems);

        // Save order to Sanity
        const orderItems = cartItems.map(item => ({
          product: { _type: 'reference', _ref: item._id },
          quantity: item.quantity,
          choice: item.selectedChoice,
          price: item.price
        }));

        const orderDoc = {
          _type: 'order',
          orderId: paymentIntent.id,
          customerEmail: email,
          items: orderItems,
          total: orderTotal,
          status: 'pending',
          shippingAddress: {
            name: shipping.name,
            line1: shipping.address.line1,
            line2: shipping.address.line2 || '',
            city: shipping.address.city,
            state: shipping.address.state,
            postal_code: shipping.address.postal_code,
            country: shipping.address.country
          }
        };

        await sanityClient.create(orderDoc);

        res.send({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error("Stripe error:", error.type || 'Unknown', error.message);
        res.status(500).json({ error: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
