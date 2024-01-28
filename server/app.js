
const express = require('express');
const connectDB  = require('./config/connect')
const app = express();
const cors =  require('cors');
const bodyParser = require('body-parser')
const userRoute = require('./routes/userRoute')
const addProductRoute = require('./routes/addProductRoute')
const categoryRoute = require("./routes/categoryRoute")
const productDetailRoute = require("./routes/productDetailRoute")
const getAllProductsRoute = require("./routes/getAllProductsRoute")
const editProductRoute = require("./routes/editProductRoute")
const searchResultsRoute = require("./routes/getSearchResults")
const getNewProductsRoute = require("./routes/getNewProductsRoute")
const addToCartRoute = require("./routes/addToCartRoute")
const getAllCartProductsRoute = require("./routes/getAllCartProductsRoute")
const deleteFromCartRoute = require("./routes/deleteFromCartRoute")
const clearCartRoute = require("./routes/clearCartRoute")
const updateCartRoute = require("./routes/updateCartRoute")
const stripeRoute = require("./routes/stripeRoute")


require('dotenv').config();
const port = process.env.PORT|5000

// Connect to Mongo DB database
try { 
  connectDB(process.env.MONGO_URL) 
  console.log("Success");

; 
} catch (error) { 
 handleError(error); 
} 



app.use(bodyParser.json()) // handle json data
app.use(bodyParser.urlencoded({ extended: true })) 

// Fixing cors error
const corsOptions ={
  origin:'https://ufc-store-client.onrender.com', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions));



app.use('/api/users', userRoute);
app.use('/api/addProduct', addProductRoute);
app.use('/api/categories', categoryRoute);
app.use('/api/product', productDetailRoute);
app.use('/api/editProduct', editProductRoute);
app.use('/api/manageProducts',getAllProductsRoute);
app.use('/api/searchResults',searchResultsRoute);
app.use('/api/newProducts',getNewProductsRoute);
app.use('/api/addToCart',addToCartRoute);
app.use('/api/cart',getAllCartProductsRoute);
app.use('/api/delete',deleteFromCartRoute);
app.use('/api/clearCart', clearCartRoute);
app.use('/api/updateCart', updateCartRoute);
app.use('/api/create-checkout-session', stripeRoute);

app.listen(port, ()=>console.log(`Server running on port ${port}`));


// error handler
app.use((err, req, res, next) => {

 return res.status(500).json({
    msg: err.message,
    success: false,
    stack: err.stack, // Add the stack trace to the response. Helps in debugging.
  });
});

module.exports = app;
