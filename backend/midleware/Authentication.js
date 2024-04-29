
const jwt = require("jsonwebtoken");

require("dotenv").config();
exports.auth=async(req,res,next)=>{

    try{
        // console.log("payload-->cookies",req.cookies.token)
         const token = req.body.token || 
                       req.cookies.token || 
                       req.header("Authorization").replace("Bearer ","")

                    //    console.log("payload-->",req.header("Authorization").replace("Bearer ",""))
         if(!token){
            return res.status(401).json({
                success:false,
                message:"Token is invalid"
            })}
          
            // verify token

        try{
            
            const Payload = jwt.verify(token,process.env.JWT_SECRETE);
             
            req.user=Payload;
        }catch(error){
            console.log("error in the middleware-->",error)
            return res.status(401).json({
                success:false,
                message:"Token is invalid"
            })
        }
        next();
    }catch(error){
        console.log("error in the middleware-->",error)
        return res.status(401).json({
            success:false,
            message:"Token is invalid"
        })
    }

}