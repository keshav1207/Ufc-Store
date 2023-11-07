
const express = require('express');
const connectDB  = require('./config/connect')
const app = express();
const cors =  require('cors');
const bodyParser = require('body-parser')
const userRoute = require('./routes/userRoute')
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
  origin:'http://localhost:5173', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions));



app.use('/api/users', userRoute);
app.listen(port, ()=>console.log(`Server running on port ${port}`));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});




// error handler
app.use(function(err, req, res, next) {
  res.status(500).json({
    msg: err.message,
    success: false,
  });
});

module.exports = app;
