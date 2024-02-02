const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const express = require('express');
const router = express.Router();


router.post('/', (async function(req, res) {
    try {
        const { products } = req.body;

        const lineItems = products.map((product) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: product.productInfo.name,
                    images: [product.productInfo.images[0]]
                },
                unit_amount: product.productInfo.price * 100,
            },
            quantity: product.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: "https://ufc-store-client.onrender.com/success",
            cancel_url: "https://ufc-store-client.onrender.com/failure"
            
        });

        return res.json({ id: session.id });
    } catch (error) {
        // Handle any errors and send an appropriate response
        console.error('Error in checkout route:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));

module.exports = router;