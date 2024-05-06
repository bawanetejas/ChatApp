import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { IoOpen } from "react-icons/io5"; 

export default function Message({message}) {
  const {user} = useSelector((state)=>state.auth);

  const myMsg = message?.senderId === user?._id 
  const msgPosition = myMsg ? "items-end" :"items-start"
  const rightM = myMsg ? "bg-blue-200 " : "bg-pink-200" 

 
  return (
    <div className={`flex ${msgPosition} flex-col`}>
        
         <div className={`text-white ${rightM} right-[1px]  w-fit
          max-w-[150px] md:max-w-[350px] px-2 py-2 rounded-md my-1 break-words`}>
         
           {
          message?.file ? <a  
          href={message?.file} target='blank_new' className='relative w-[250px] h-[250px]  text-[#f3f6f3d3]' >
            <embed src={message?.file} className='w-[150px] h-[150px] p-4 scrollbar' />
            <IoOpen className='absolute top-1 '/>
          </a> : <p className='hidden'></p>
         }
          
         {message?.message}
          </div>
    </div>
  )
}
