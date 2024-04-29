const express = require("express");
const User = require('../Models/user')
const otpGenerator= require("otp-generator");
const Otp = require("../Models/Otp");
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const crypto = require("crypto");
const mailSender = require("../utils/mailSender");



exports.sendOtp = async(req,res)=>{
   try{
      const {email,userName,password,confirmPassword} = req.body;

      if(password !== confirmPassword){
         return res.status(400).json({
            success:false,
            message:"password and confirm password not match"
         })
      }
      if(!email || !userName){
         return res.status(400).json({
            success:false,
            message:"All fields are required"
         })}


         const user = await User.findOne({email:email});
         if(user){
             return res.status(400).json({
               success:false,
               message:"User with this email already exist"
            });
         }
         const username = await User.findOne({userName:userName});

         if(username){
            return res.status(400).json({
               success:false,
               message:"User with this userName already exist"
            });
         }
         const otp = otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
            
         })
          
         const insertOtp= await Otp.create({
            email,
            otp:otp,
         })

         return res.status(200).json({
            success:true,
            message:"OTP sent",
            // data:insertOtp
         })

  
   }catch(error){

      return res.status(500).json({
         success:false,
         message:error.message,
     })
 }

   }

exports.signup = async(req,res)=>{

    try{
     const {firstName,lastName,password,confirmPassword,email,otp,userName}=req.body;
     console.log(req.body);
     if(!firstName || !lastName || !password || !confirmPassword || !email  || !otp){
      return res.status(400).json({
         success:false,
         data:"send all neccessory data",
      })}
      
      const dbotp = await Otp.find({email}).sort({createdAt:-1}).limit(1)

      // console.log("dbotp from signup-->78",dbotp)

      if(!dbotp){
         return res.status(404).json({                                                                                                                                        
            success:false,
            message:"OTP missing"
         })
      }
      if(otp !== dbotp[0].otp){
         return res.status(404).json({
            success:false,
            message:"OTP not matched"
         })
      }
      
      const hashpass = await bcrypt.hash(password,10);
       const userImage = `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
      const user = await User.create({
         firstName:firstName,
         lastName:lastName,
         password:hashpass,
         email:email,
         userImage,
         userName
      })

      // console.log("sign up flow-->",user)  

      return res.status(200).json({
         success:true,
         message:"Sign Up successfull",
         // data:insertOtp
      })
     }
    catch(error){
      console.log("error in signup api-->",error);
      return res.status(400).json({
         success:false,
         data:error
      })

    }

}

exports.login = async(req,res)=>{
   try{
      const {userName,password}= req.body;
       console.log(req.body);
      if(!userName || !password){
         return res.status(404).json({
            success:false,
            message:"Please fill data"
         })}

         let user = await User.findOne({userName});
         if(!user){
            return res.status(400).json({
               success:false,
               message:"User not exist"
            })
         }

      if(!await bcrypt.compare(password,user.password)){
         return res.status(404).json({
            success:false,
            message:"Wrong Password"
         })}

         const Payload={
            userName:user.userName,
            email:user.email,
            id:user._id,
         }

         const token=jwt.sign(Payload,process.env.JWT_SECRETE,{
            expiresIn:"30d"
         })
         user= user.toObject()
         user.token=token;
         user.password=undefined;
         // create cookie
         const options={
            httpOnly:true,
            expires:new Date(Date.now() + 30*24*60*60*1000)
        }
    
        return res.cookie("token",token,options).status(200).json({
         success:true,
         token,
         user,
         message:"User Logged In"
        })
         
   
   }catch(error){
      console.log("error in log in api --> ",error)
      return res.status(400).json({
         success:false,
         message:"Login fail",
         data:error.message
      })
   }
}

//reset password link and token

exports.resetPassToken=async(req,res)=>{

   try{

      const {email} = req.body;

      const user = await User.findOne({email});

      if(!user){
         return res.status(404).json({
            success:false,
            message:"User with this email not exist"
         })
      }

      //generating token

      const token = crypto.randomBytes(20).toString("hex");

      const updateDetails = await User.findOneAndUpdate({email:email},
                                                        {token:token,
                                                        resetPasswordExpires:Date.now()+5*60*1000},
                                                        {new:true});

      // console.log("reset pass token update detail -->208",updateDetails);

      //  befor publishing the project we run it on localhost port 
      // after publishing the project put vercel link of front end here
      
      const link = `http://localhost:3000/reset-password/${token}`;  
      
      await mailSender(email,"Reset password link",`<li>${link}</li>`)

      return res.status(200).json({
         success:true,
         message:"Email sent successfully",
         token:token
      })

   }catch(error){
      console.log("error in reset password -->",error);
      return res.status(400).json({
         success:false,
         message:"Email not sent",
         
      })

   }
    
}

exports.resetPassword = async(req,res)=>{
   try {
       const {password,confirmPassword,token} =req.body;

       if(password !== confirmPassword){
         return res.status(400).json({
            success:false,
            message:"password and confirmpassword not match"
         })}
        
         const user = await User.findOne({token});

         if(!user){
            return res.status(400).json({
             success:false,
             message:"Token Invalid please try again"
            })}

            if(user.resetPasswordExpires<Date.now()){
               return res.status(400).json({
                  success:false,
                  message:"Link is expired"
               });
            }
         const hashpass= await bcrypt.hash(password,10);

         const newPassuser = await User.findOneAndUpdate({token},
                                                         {password:hashpass},
                                                         {new:true})

         return res.status(200).json({
            success:true,
            message:"Password updated successfully"
         })                                                
   }catch(error){
         console.log("error int reset pass api -->",error);
         return res.status(400).json({
            success:false,
            message:error.message,
            
         })
   }
}