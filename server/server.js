const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");
require("dotenv").config();


const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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

        const subTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
        const discountedTotal = cartItems.reduce((total, item) => total + (item.discount ? (item.price * item.discount / 100) : 0) * item.quantity, 0);
        const orderTotal = cartItems.reduce((total, item) => total + (item.discount ? item.price - (item.price * item.discount / 100) : item.price) * item.quantity, 0);
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
            amount: orderTotal * 100, // * 100 to Convert to cents
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

        res.send({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error("Error creating payment intent:", error);
        res.status(500).json({ error: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
