
import React, { useEffect, useRef } from 'react'
import {useDispatch, useSelector} from "react-redux"

import Message from "./Message"
import { setMessages } from '../../../../redux/slicess/ChatSlice';
import { useListenMsg } from '../../../../Servicess/Operations/listenMsg';
import { useSocketContext } from '../../../../Socket/SocketContext';
export default function Messages() {
  const {user} = useSelector((state)=>state.auth);
  const {messages,chatFriend} = useSelector((state)=>state.chat);
  
  const dispatch = useDispatch();
  const lastMessageRef   = useRef();

  useEffect(()=>{
    setTimeout(()=>{
      lastMessageRef.current?.scrollIntoView({behavior:"smooth"});
    },100)
  },[messages]);
// socket listen to the new msg
// useListenMsg();

const {socket,onlineUsers} = useSocketContext();


useEffect(()=>{
    // if socket is present then check the message
    if(chatFriend === null)  return
    socket?.on("newMessage",(newMessage)=>{
        // newMessage.shouldShake=true;
        console.log("new message from socket ",newMessage)
        // const sound=new Audio(filename)
        // sound.play()
        
     
      if( chatFriend?._id === newMessage?.senderId){
        if(messages === undefined){
          
          dispatch(setMessages(newMessage))
      }
      else{
        // console.log("message from listen msg inside else-->",messages)
          dispatch(setMessages([...messages,newMessage]))
      }
      
      }
    });
    console.log("onlline user from messages ,",onlineUsers)
    return () => socket?.off("newMessage");
},[socket,setMessages,messages]);


  return (
    <div className='px-4 flex-1 relative h-[75%] overflow-y-auto overflow-x-hidden w-full'>
         { chatFriend &&
          messages?.length > 0 && 

          messages?.map((message)=>{
            return  <div className='w-full'  key={message?._id} ref={lastMessageRef}>
                      <Message message={message}/>
                     
            </div>
          })

         }
         {
          messages?.length === 0 &&
          <p>Say hi, to your friend</p>
         }
    </div>
  )
}
