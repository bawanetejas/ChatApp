
import React, { useState } from 'react'
import { IoMdSearch } from "react-icons/io";
import toast from "react-hot-toast"
import { useDispatch, useSelector } from 'react-redux';
import { setChatFriend } from '../../../../redux/slicess/ChatSlice';
import { getAllMessage } from '../../../../Servicess/Operations/chatMain';
export default function Searchbar() {
    const dispatch  = useDispatch();
    const [search,setSearch] = useState('');
    const {allFriends} = useSelector((state)=>state.chat)
    const {token} = useSelector((state)=>state.auth)
    const handleSubmit = async(e)=>{
        e.preventDefault();

        if(!search){
            return
        }
        if(search.length<3){
            toast.error("Search input of length 3");
            return;
        }
        const ans = allFriends.find((f)=>f.firstName.toLowerCase().includes(search.toLowerCase()));

        if(ans){
            dispatch(setChatFriend(ans));
            await getAllMessage(token,ans._id,dispatch);
            setSearch("");
        }else{
            toast.error("No Such User Found");
            return;
        }
    }
    //
    // 
   
  return (
    <form onSubmit={handleSubmit}
    className='p-4 flex items-center justify-between w-full relative'
    >
        <input
            placeholder='Search...'
            type='text'
            value={search}
            className='bg-richblack-500 placeholder:ring-richblack-5 text-xl rounded-full py-2 px-4 w-full'
            onChange={(e)=>setSearch(e.target.value)}
        />
        <button className='absolute right-6 '>
            <IoMdSearch className='font-bold text-xl text-richblack-25 ' fontSize={10} color='pink'/>
        </button>
    </form>
  )
}
