import React from 'react'
import {useDispatch,useSelector} from "react-redux"
import {setChatFriend} from "../../../../redux/slicess/ChatSlice"
import { getAllMessage } from '../../../../Servicess/Operations/chatMain';
import { useSocketContext } from '../../../../Socket/SocketContext';
export default function Friend({friend}) {
  const {token} = useSelector((state)=>state.auth);
  const dispatch = useDispatch();
  const {onlineUsers} = useSocketContext();
  const setCoversession = async()=>{
    try{
         await getAllMessage(token,friend._id,dispatch);
         dispatch(setChatFriend(friend));
    }catch(error){
      console.log("error in ths friend component-->",error);
      // toast.error("Error in the api")
    }

  }
  return (
    <div onClick={setCoversession}
    className='border-b-[1px] border-b-blue-600 flex flex-row gap-3 py-2 relative'>
      <img src={friend.userImage} loading='lazy'
       className='w-[40px] h-[40px] rounded-full'
      />{
        onlineUsers.includes(friend._id) && 
        <p className='w-4 h-4 rounded-full bg-pink-300 absolute top-1 left-1'></p>
      }
      <p>{friend.firstName} {friend.lastName}</p>

    </div>
  )
}
