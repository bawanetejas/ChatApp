const mongoose = require("mongoose");

require("dotenv").config();

exports.dbConnect =()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(()=>{
        console.log("Db connection is successfull")
    }).catch((error)=>{
        console.log("error in db connection",error);
        process.exit(1)
    })
}