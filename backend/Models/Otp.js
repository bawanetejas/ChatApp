const mongoose = require("mongoose");

const mailSender = require("../utils/mailSender");

const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60, // The document will be automatically deleted after 5 minutes of its creation time
    },
})

async function emailVerifiactionMail(email,otp){
    try{
        const mailResponse = await mailSender(email,"Verification of the otp",`<h>${otp}</h>`)
        // console.log("mail response for otp in schema-->",mailResponse);
    }catch(error){
        console.log("error in mail send in otp schema -->",error)
        throw error;
    }
}

otpSchema.pre("save",async function(next){

    await emailVerifiactionMail(this.email,this.otp);
    next();
});

module.exports = mongoose.model("OTP",otpSchema);