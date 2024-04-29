import React, { useState } from 'react'
import Messages from './Messages'
import TypeMessage from './TypeMessage'
import { useSelector } from 'react-redux'

// import {Pdf} from "../../../Commen/Commen"

export default function MessageContainer() {

  const [open ,setOpen]= useState(false)
  const {chatFriend} = useSelector((state)=>state.chat)
  return (
    <div className='w-[60%] relative h-full'>
        <div className='flex gap-2 p-4 items-center'>
          <img src={chatFriend?.userImage} className='w-[40px] h-[40px] rounded-full'/>
          <p>{chatFriend?.firstName} {chatFriend?.lastName}</p>
        </div>
        <Messages/>
        
       {/* <a href='https://res.cloudinary.com/dasuxjzzj/video/upload/v1703756425/Happy/bjgemdowqao7lkf0bttx.mp4' 
       download target='blank_new'
       className='p-10 bg-blue-200'
       >
       <embed 
         
         src="https://res.cloudinary.com/dasuxjzzj/video/upload/v1703756425/Happy/bjgemdowqao7lkf0bttx.mp4" download
          className={`${open ? "absolute w-[800px] h-[800px] inset-10 cursor-pointer":"relative w-[200px] h-[200px]"} cursor-pointer p-4`}
          type="application/pdf"   ></embed>
       </a>
      */}
        <TypeMessage/>
    </div>
  )
}
