const cloudinary = require('cloudinary').v2

require("dotenv").config()

exports.cloudinaryConnect=()=>{
    try{
        cloudinary.config({
            cloud_name:process.env.cloud_name,
            api_key:process.env.cloud_key,
            api_secret:process.env.cloud_secret
        })
    }catch(error){
        console.log("error in the cloud connection");
        console.log(error);
    }
}