const Category = require( "./models/categoryModel");
require('dotenv').config();
const connectDB  = require('./config/connect')
const mongoose = require("mongoose");

// Connect to Mongo DB database
async function main(){
    try { 
        connectDB(process.env.MONGO_URL) 
        await createCategories();
        mongoose.connection.close();
        console.log("Success");
      
      ; 
      } catch (error) { 
       console.log(error); 
      } 
    
};

main();



  async function createCategory(name,description){
       await Category.create({name:name,description:description});
  };


  async function createCategories(){
    await Promise.all([
        createCategory("Apparel","From UFC t-shirts to durable UFC jerseys, get your hands on the very latest MMA apparel. Browse our selection of official UFC gear.Shop Now!"),
        createCategory("Equipment","If you're an MMA fan and looking to buy some high-quality equipment, look no further than the official UFC store. Offering the latest and greatest in UFC equipment including full body training, the official UFC store will have everything you need for your next training session. From official MMA gloves to MMA mouth guards, get your gear today!"),
        createCategory("Accessories","Whether it’s a UFC flag, a Conor McGregor ring or even a UFC championship belt, the official Ultimate Fighting Championship store has everything a true MMA fan could ever need!  Our varied selection of UFC accessories will leave you and your fellow MMA friends kitted out with official high-quality gear. Shop our online range now."),
    ]);
  }





