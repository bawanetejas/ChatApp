
import React from 'react'
import Searchbar from './Searchbar'
import Friends from './Friends'
import Logout from './Logout'
import { useDispatch, useSelector } from 'react-redux'


export default function Sidebar() {

  const {user} = useSelector((state)=>state.auth)
  const {chatFriend} = useSelector((state)=>state.chat)
  return (
    <div className={`relative xs:border-r-[1px] xs:border-r-pink-200 
     w-[100vw] xs:w-[40%] ${chatFriend ? "hidden":"block"} xs:block`}>
    <div className='flex gap-2 items-center p-4'>
       <img src={user?.userImage}
        className='w-[40px] h-[40px] rounded-full'
        loading='lazy'/>
        <p>{user?.firstName} {user?.lastName }</p>
        
    </div>
    <Searchbar/>
    <Friends/>
    <Logout/>
    </div>
  )
}
