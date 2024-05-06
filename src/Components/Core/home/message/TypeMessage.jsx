import React, { useRef, useState } from 'react'
import { BsFillSendFill } from "react-icons/bs";
import { sendMessage } from '../../../../Servicess/Operations/chatMain';
import { useDispatch, useSelector } from 'react-redux';
import { FaCloudUploadAlt } from "react-icons/fa";

export default function TypeMessage() {
   
    const inputFile = useRef("");
    const [feFile,setFeFile] = useState(null);
    const {token} = useSelector((state)=>state.auth);
    const {chatFriend,messages} = useSelector((state)=>state.chat);
    const [message,setMessage] = useState('');
    const dispatch = useDispatch();

    const handleFile = (e)=>{
      const file = e.target.files[0];
      console.log("file of the type msg",file)
      setFeFile(file);
      
    }
    const handleRef = ()=>{
      inputFile.current.click();
    }
    const handleSubmit =async(e)=>{
         e.preventDefault();
        
         console.log("messages from type mes-->",messages)
         await sendMessage(token,chatFriend._id,message,dispatch,messages,feFile);
         setMessage("");
         setFeFile(null);
        
    }

  return (
    <form onSubmit={handleSubmit} className=' absolute bottom-0 flex gap-2 items-center 
    justify-center w-full px-4 py-2'>
     <input
        placeholder='Type message'
        type='text'
        value={message}
        className='bg-richblack-500 placeholder:ring-richblack-5 
        text-xl rounded-full py-2 px-4 w-full'
        onChange={(e)=>setMessage(e.target.value)}
     />

    <div className='absolute right-[60px]'>
      <input
        type="file"
        className='hidden'
        ref={inputFile}
        onChange={handleFile}
      />
      <p onClick={handleRef} className=' w-[40px] h-[40px] rounded-full flex 
    justify-center items-center   bg-blue-200 '
      ><FaCloudUploadAlt/></p>
    </div>
    <button type='submit' className=' w-[40px] h-[40px] rounded-full flex 
    justify-center items-center   bg-blue-200 ' ><BsFillSendFill/></button>
    </form>
  )
}
