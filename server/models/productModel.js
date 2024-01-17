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
        ref: "categories",
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

    // This is used to delete the images from Cloudinary in case we delete the product
    cloudinaryPublicId: {
        type: Array,
        default: [],
        required:true,
    },

    },

    //set timestamps: true, Mongoose will add two properties of type Date to your schema createdAT 
        // & updateAT
        
        {timestamps: true}
    
);

productSchema.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
      return `/products/${this._id}`;
      })


//Create a text index to do the text search for the searchResultsPage
productSchema.index({name: 'text'});

const Product = mongoose.model("products", productSchema);

module.exports = Product;