import React, { useState } from 'react'
import Messages from './Messages'
import TypeMessage from './TypeMessage'
import { useDispatch, useSelector } from 'react-redux'
import { setChatFriend } from '../../../../redux/slicess/ChatSlice';
import { IoArrowBackSharp } from "react-icons/io5";
// import {Pdf} from "../../../Commen/Commen"

export default function MessageContainer() {
  const dispatch = useDispatch();
 
  const {chatFriend} = useSelector((state)=>state.chat)
  return (
    <div className={` w-full xs:w-[60%]  ${chatFriend ? "block ":"hidden"} xs:block relative h-full `}>
        <div className='flex gap-2 p-4 items-center'>
          <div
          onClick={()=>dispatch(setChatFriend(null))}
          className='relative mr-2 cursor-pointer'
          ><IoArrowBackSharp/>
          </div>
          <img src={chatFriend?.userImage} className='w-[40px] h-[40px] rounded-full'/>
          <p>{chatFriend?.firstName} {chatFriend?.lastName}</p>
          
        </div>
        <Messages/>
        <TypeMessage/>
    </div>
  )
}
