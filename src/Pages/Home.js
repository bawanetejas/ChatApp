import React, { useEffect } from 'react'
import {useSelector,useDispatch} from "react-redux"
import { NavLink } from 'react-router-dom'
import Sidebar from '../Components/Core/home/sidebar/Sidebar'
import MessageContainer from '../Components/Core/home/message/MessageContainer'
import { getAllUser } from '../Servicess/Operations/chatMain'

export default function Home() {
  
  const {token} = useSelector((state)=>state.auth);
  const {chatFriend} = useSelector((state)=>state.chat)
  const dispatch = useDispatch();
  useEffect(()=>{
    getAllUser(token,dispatch);

  },[])
  return (
    <div className='bg-richblack-900 min-h-[100vh] w-full flex flex-row items-center justify-center'>
        <div className='text-xl rounded-md text-richblack-5 flex bg-pure-greys-800 h-[100vh]
                        w-[100vw] md:max-w-[600px] xl:max-w-[1000px] md:h-[70vh]'>
            <Sidebar/>
           { chatFriend &&
            <MessageContainer/>
            }
            {
              !chatFriend &&
              <div className=' hidden xs:flex items-center justify-center text-center text-richblack-200 ml-10'>
                <p>Select a friend to chat</p>
              </div>
            }
        </div>
    </div>
  )
}
