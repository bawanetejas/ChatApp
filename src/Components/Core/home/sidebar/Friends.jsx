import React from 'react'
import Friend from './Friend'
import {useSelector} from "react-redux"
import { useSocketContext } from '../../../../Socket/SocketContext';
function Friends() {
  const {onlineUsers} = useSocketContext();
  const {allFriends,}  = useSelector((state)=>state.chat);
  return (
    <div className='px-4 h-[70%] overflow-y-auto'>
        {
          allFriends.map((x)=>{
            return <Friend  key={x._id} friend={x}  />
          })
        }

    </div>

    
  )
}

export default Friends