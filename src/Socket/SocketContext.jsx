import { createContext , useState,useEffect,useContext } from "react";
import {useSelector} from "react-redux"
import io from "socket.io-client"

const SocketContext = createContext();

export const useSocketContext =()=>{
    return useContext(SocketContext);
}

export const SocketContexProvider = ({children})=>{
    const [socket,setSocket] = useState(null);
    const [onlineUsers,setOnlineUsers] = useState([]);

    const {user}  = useSelector((state)=>state.auth);

    useEffect(()=>{
        if(user){
            const socket = io("http://localhost:4000",{
                
                query:{
                    userId:user._id,
                },
               
            });

            setSocket(socket);
            // console.log("socket id-->",socket)
            socket.on("getOnlineUsers",(users)=>{
                setOnlineUsers(users);
            });
            
            return ()=>socket.close();

            
        }else{
            if(socket){
                socket.close()
                setSocket(null)
            }
        }
    },[user])

    return <SocketContext.Provider value={{socket,onlineUsers}}>{children}</SocketContext.Provider>
}