import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
    type:String,
    required:true},


    email: {
        type:String,
        required:true,
        unique: true},

        email: {
            type:String,
            required:true,
            },

        },
        //set timestamps: true, Mongoose will add two properties of type Date to your schema createdAT 
        // & updateAT
        
        {timestamps: true}



)


const User = mongoose.model("users", userSchema);

module.exports = User;