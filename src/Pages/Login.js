
import React, { useState } from 'react'
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import { login } from '../Servicess/Operations/auth';
import {useNavigate} from 'react-router-dom'
import {useDispatch } from "react-redux"
export default function Login() {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [pass, setShow] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSubmit = async(e)=>{
        e.preventDefault();
       await login(email,password,navigate,dispatch);
    }

    const forgotpass = async()=>{
        console.log("we are in progress to send link")
    }
  return (
    <div className='w-full h-full min-h-[100vh] text-richblack-25 flex items-center justify-center bg-richblack-900'>
        <div className='w-11/12 max-w-[540px]'>
            <h1 className='text-2xl text-richblack-50 font-medium'> Please Login !!!</h1>

            <form onSubmit={handleSubmit}>
                <label>
                    <p className='formLabel'>User Name</p>
                    <input
                        className='formStyle'
                        type='text'
                        placeholder='Enter  user name'
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                    
                </label>
                <label className='relative mt-4'>
                    <p className='formLabel'>Password</p>
                    <input
                        className='formStyle'
                        type={pass ? "text":"password"}
                        placeholder='Enter Password'
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                    <div onClick={()=> setShow(!pass)}
                     className='w-[40px] absolute top-[80%] right-0'
                     >
                    {
                        pass ? <FaEye/> : <FaEyeSlash/>
                    }
                    </div>
                </label>
                
                <div className='mt-4'>
                <button type='submit' className='yellowBtn text-richblack-700'
                >Log  In</button>
                <div className='flex flex-row justify-between items-center'
                >
                <p
                className='text-pink-400 cursor-pointer'
                onClick={forgotpass}
                >Forgot Password</p>
                <p 
                onClick={()=>navigate('/sign-up')}

                className='text-pink-400 cursor-pointer'>
                  Go to  Sign-up
                </p>
                </div>
                </div>
            </form>
        </div>
    </div>
  )
}
