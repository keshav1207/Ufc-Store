const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
    type:String,
    required:true,
    trim:true,
    lowercase:true,
    },

    comments: {
        type:String,
        
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },

    features: {
        type:String,
        required:true,
    },


    price: {
        type:Number,
        required:true,
    },

    images: {
        type: Array,
        default: [],
        required:true,
    },
    
});

productSchema.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
      return `/products/${this._id}`;
      })

const Product = mongoose.model("products", productSchema);

module.exports = Product;