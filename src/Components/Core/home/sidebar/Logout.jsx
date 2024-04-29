
import React from 'react'
import { BiLogOut } from "react-icons/bi";
import {useDispatch} from "react-redux"
import {setToken,setUser} from "../../../../redux/slicess/AuthSlice"

export default function Logout() {

  const dispatch = useDispatch();
  const logout =()=>{
    dispatch(setToken(null));
    localStorage.removeItem("token")
    localStorage.removeItem("user");
    dispatch(setUser(null));
  }
  return (
    <div onClick={logout}
    className='absolute bottom-2 left-2 w-[40px] h-[40px] rounded-full flex justify-center items-center   bg-blue-200 '>
        <BiLogOut width={5}/>
    </div>
  )
}
