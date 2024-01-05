const stripe =  require("stripe")(process.env.STRIPE_SECRET_KEY);
const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");

router.post('/', asyncHandler( async function(req, res, next) {
   
const{products} = req.body




const lineItems = products.map((product)=>({
    price_data:{
        currency:"usd",
        product_data:{
            name: product.productInfo.name,
            images:[product.productInfo.images[0]]
        },
        unit_amount: product.productInfo.price * 100,
    },

    quantity: product.quantity,

    
    
}));





const session = await stripe.checkout.sessions.create({
    payment_method_types:["card"],
    line_items: lineItems,
    mode:"payment",
    success_url:"http://localhost:5173/",
    cancel_url:"http://localhost:5173/cart"
})

res.json({id:session.id})






} ))

module.exports = router;