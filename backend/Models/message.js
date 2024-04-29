const User = require("./user")
const mongoose  = require("mongoose");

const messageSchema  = new mongoose.Schema({

    message:{
        type:String,
        required:true,
    },
    file:{
        type:String
    },
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    recieverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }   
},{timestamps:true});

module.exports  = mongoose.model("Message",messageSchema)