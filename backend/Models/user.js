
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    userName:{
        type:String,
        required:true,
        unique: true,
    },
    email:{
        type:String,
        required: true,
    },
    password:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        enum:["male","female","other"],
    },

    friends: [
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
                required:true,
            }],
    token:{
        type:String,
    },
    resetPasswordExpires:{
        type:Date,
    },
    
    userImage:{
        type:String,
        default:""
    },

    about:{
        type:String,
        default:""
    }
},
    {
        timestamps:true,
    }
    )

module.exports = mongoose.model("User",userSchema);