import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { sendOtp, signUp } from '../Servicess/Operations/auth';
import OtpInput from 'react-otp-input';
import {useSelector } from 'react-redux'
export default function VerifyEmail() {
  
    const [OTP ,setOTP] = useState();
    const navigate = useNavigate();
    const {signupdata}=useSelector((state)=>state.auth);
      
    const handleSubmit =async(e)=>{
        e.preventDefault();
       try{
        const {firstName,lastName,email,userName,password,confirmPassword}=signupdata;
        const res = await signUp(firstName,lastName,email,userName,password,confirmPassword,OTP,navigate)
       }catch(error){
        console.log(error);
       }
    }

    const resendOtp =async()=>{
      const {email,userName,password,confirmPassword}=signupdata;
      await sendOtp(email,userName,password,confirmPassword,navigate)
    }
  return (
    <div className='bg-richblack-900 flex items-center justify-center w-full h-[100vh]'>
    <form onSubmit={handleSubmit}
    className='max-w-[500px] text-white w-11/12'
    >
    <p className='text-yellow-50 text-3xl font-medium pb-3'>Verify Email</p>
    <p className='text-richblack-50 text-xl pb-3'>
                      Please Enter a otp we have just sent on your email {signupdata.email}</p>
    <div>
    <OtpInput
    value={OTP}
    onChange={setOTP}
    numInputs={6}
    
    renderSeparator={<span>-</span>}
    renderInput={(props) => <input {...props}  style={{
        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
      }}
        className='p-[12px] bg-richblack-800  border-none rounded-md text-[20px] text-richblack-25 text-center w-full'
      />
      }
      />
    </div>
    <button type='submit'
    className='text-richblack-800 bg-yellow-100 text-xl rounded-md p-2 w-full mt-3'
    > Verify Email</button>
    <div className='flex justify-end items-center '>
        <div 
        onClick={resendOtp}
        className='text-pink-200 cursor-pointer'>
            Resend OTP
        </div>
    </div>
</form>
</div>
  )
}
