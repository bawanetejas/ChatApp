import React from 'react'
import { useForm } from 'react-hook-form'

import { setSignupdata } from '../redux/slicess/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import  { sendOtp} from "../Servicess/Operations/auth"
import { useNavigate } from 'react-router-dom';

export default function Signup() {


 const dispatch = useDispatch();
 const navigate = useNavigate();

  const{
    handleSubmit,
    register,
    formState:{errors},
    
    reset,
  }=useForm();  

  const onSubmitForm = async(data)=>{
    // console.log(data);
    dispatch(setSignupdata(data))
    await sendOtp(data.email,data.userName,data.password,data.confirmPassword,navigate);
     
  }

  return (
    <div className='w-full  min-h-[100vh] flex flex-col gap-y-3 items-center text-white justify-center bg-richblack-900'>
      <div className=' max-w-[500px] w-11/12 flex flex-col gap-y-3 items-center'>
      <h1 className='text-2xl text-richblack-100'>Hey , Please Signup to connect your friend</h1>
      <form onSubmit={handleSubmit(onSubmitForm)}
      className='flex flex-col justify-center gap-y-3'
      >
        <div className='flex justify-between items-center'>
          <label htmlFor='firstName'><p className='formLabel'>First Name</p>
          <input
             className='formStyle formShadow'
            type='text'
            id='firstName'
            placeholder='First Name'
            {...register("firstName",{
              required:true,
            })}
            
          />
          {
            errors.firstName && (
              <span>
                {errors.firstName.message}
              </span>
            )
          }
          </label>
          <label htmlFor='lastName'><p className='formLabel'>Last Name</p>
          <input
             className='formStyle formShadow'
            type='text'
            id='lastName'
            placeholder='Last Name'
            {...register("lastName",{
              required:true,
            })}
            
          />
          {
            errors.lastName && (
              <span>
                {errors.lastName.message}
              </span>
            )
          }
          </label>
        </div>

        {/* user name */}
        <label htmlFor='userName'><p className='formLabel'>User Name</p>
          <input
             className='formStyle formShadow'
            type='text'
            id='userName'
            placeholder='Enter User Name'
            {...register("userName",{
              required:true,
            })}
            
          />
          {
            errors.userName && (
              <span>
                {errors.userName.message}
              </span>
            )
          }
          </label>


        {/* email */}
        <label htmlFor='email'><p className='formLabel'>Email</p>
        <input
           className='formStyle formShadow'
          type='text'
          id='email'
          placeholder='Enter Email'
          {...register("email",{
            required:true,
          })}
          
        />
        {
          errors.eamil && (
            <span>
              {errors.email.message}
            </span>
          )
        }
        </label>

         {/* passwords */}
         <div className='flex gap-4 justify-between items-center'>
          <label htmlFor='password' className='formLabel'><p>Password</p>
          <input
            className='formStyle formShadow'
            type='text'
            id='password'
            placeholder='password'
            {...register("password",{
              required:true,
            })}
            
          />
          {
            errors.password && (
              <span>
                {errors.password.message}
              </span>
            )
          }
          </label>
          <label htmlFor='confirmPassword'><p className='formLabel'>Confirm  Password</p>
          <input
             className='formStyle formShadow'
            type='text'
            id='confirmPassword'
            placeholder='confirm password'
            {...register("confirmPassword",{
              required:true,
            })}
            
          />
          {
            errors.confirmPassword && (
              <span>
                {errors.confirmPassword.message}
              </span>
            )
          }
          </label>
        </div>

        <button
        className='yellowBtn'
         type='submit'>
          Sign Up
        </button>
      </form>
      </div>
    </div>
  )
}
