const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
    type:String,
    required:true,
    

    },

    description: {
        type:String,
        required:true,

    },
    
});

categorySchema.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
      return `/categories/${this._id}`;
      })

const Category = mongoose.model("categories", categorySchema);

module.exports = Category;