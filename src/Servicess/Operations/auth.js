
import toast from "react-hot-toast";
import { authEndpoint } from "../api";
import {setToken} from "../../redux/slicess/AuthSlice"
import { apiConnector } from "../apiConnector";

export const sendOtp = async (email,userName,password,confirmPassword ,navigate)=>{
    const wait = toast.loading("Wait...");
    try{
        
        // const loading = toast.loading('Waiting...');
         const res = await apiConnector("POST", authEndpoint.SENDOTP_API,{email,userName,password,confirmPassword});
         
        if(!res.data.success){
           throw new Error("Error in the api")
        }
         navigate("/verify-email");
        toast.success(res.data.message)
         toast.dismiss(wait);
    }catch(error){
        
        toast.error("Something  wrong")
        console.log("error of send otp--->",error);
    }
    toast.dismiss(wait);
}

export const signUp = async(firstName,lastName,email,userName,password,confirmPassword,otp,navigate)=>{

   const loading = toast.loading("Wait...");
   try{

      const res = await apiConnector("POST",authEndpoint.SIGNUP_API,{firstName,lastName,password,confirmPassword,email,otp,userName})
      
      // console.log("res of the signup api -->",res);
      if(!res.data.success){
         throw new Error("Network error")
      }
      toast.success("sign up successfull");
      navigate("/")
   }catch(error){
      console.log(error);
      toast.error("Something went wrong");
   }
   toast.dismiss(loading);
}

export const login = async(userName,password,navigate,dispatch)=>{
   const loading = toast.loading("wait...");
   try{

      const res =await apiConnector("POST",authEndpoint.LOGIN_API,{userName,password});
      console.log("res of the login api-->",res);

      localStorage.setItem("token",JSON.stringify(res.data.token));
      dispatch(setToken(res.data.token));
      
     
      localStorage.setItem("user",JSON.stringify(res.data.user));
      toast.success("Login Successfull");
      navigate('/chat');
   }catch(error){
      console.log("Error in the login api-->",error);
      toast.error("Something Went Wrong");
   }

   toast.dismiss(loading);
}