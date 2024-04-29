import { useEffect } from "react";

import {useSelector} from "react-redux"
import { useSocketContext } from "../../Socket/SocketContext"
import { setMessages } from "../../redux/slicess/ChatSlice";

export const useListenMsg = ()=>{
    const {socket} = useSocketContext();
    const {messages}  = useSelector((state)=>state.chat)

    useEffect(()=>{
        // if socket is present then check the message
        socket?.on("newMessage",(newMessage)=>{
            newMessage.shouldShake=true;
            // const sound=new Audio(filename)
            // sound.play()

            setMessages([...messages,newMessage]);
        });
    },[socket,setMessages,messages]);
};