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
        const { data } = req.body; // Get amount from frontend

        const paymentIntent = await stripe.paymentIntents.create({
            amount: 1999, // * 100 to Convert to cents
            currency: "usd",
            automatic_payment_methods: {
                enabled: true,
            },
           // payment_method_types: ["card"],
        });

        res.send({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error("Error creating payment intent:", error);
        res.status(500).json({ error: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
