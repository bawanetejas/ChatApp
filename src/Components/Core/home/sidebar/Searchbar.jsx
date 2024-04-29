
import React, { useState } from 'react'
import { IoMdSearch } from "react-icons/io";
import toast from "react-hot-toast"
export default function Searchbar() {
    const [search,setSearch] = useState('');

    // const handleSubmit = (e)=>{
    //     e.preventDefault();

    //     if(!search){
    //         return
    //     }
    //     if(search.length<3){
    //         toast.error("Search input of length 3");
    //         return;
    //     }
    //     const ans = friends.find((f)=>f.toLowerCase().includes(search.toLowerCase()));

    //     if(ans){
    //         setChatFriend(ans);
    //     }else{
    //         toast.error("No Such User Found");
    //         return;
    //     }
    // }
    //
    // 
    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(search);
    }
  return (
    <form onSubmit={handleSubmit}
    className='p-4 flex items-center justify-between w-full relative'
    >
        <input
            placeholder='Search...'
            type='text'
            className='bg-richblack-500 placeholder:ring-richblack-5 text-xl rounded-full py-2 px-4 w-full'
            onChange={(e)=>setSearch(e.target.value)}
        />
        <button className='absolute right-6 '>
            <IoMdSearch className='font-bold text-xl text-richblack-25 ' fontSize={10} color='pink'/>
        </button>
    </form>
  )
}
