
import toast from "react-hot-toast"
import { messageEndpoint } from "../api"; 
import { apiConnector } from "../apiConnector";
import {setAllFriends, setMessages} from "../../redux/slicess/ChatSlice"
const {SEND_MESSAGE,GET_ALL_USER,GET_MESSAGES} = messageEndpoint;

export const getAllUser = async (token,dispatch)=>{
    const loading  = toast.loading("Wait..")
    try{

        const res = await apiConnector("POST",GET_ALL_USER,null,{
            Authorization:`Bearer ${token}`
        });
        dispatch(setAllFriends(res.data.data));
        console.log(res);
    }catch(error){
        console.log("error in the get user api-->",error);
        toast.error("Not able to fetch user");
    }
    finally{
        toast.dismiss(loading);
    }
}

export const getAllMessage = async (token,fid,dispatch)=>{
   
    const loading = toast.loading("Wait..");
    try{
        // console.log("toke and id from  messages-->",token,fid)
        
       const res = await apiConnector("POST",GET_MESSAGES,{id:fid},{
        Authorization:`Bearer ${token}`
       },);
    //    console.log("id from the fe",id);
    //    console.log("res of the all message api -->",res);
       dispatch(setMessages(res.data.message));
       
    }catch(error){
        console.log("Error in the get all message api-->",error);
        toast.error("Something went wrong");
    }
    finally{
        toast.dismiss(loading);
    }
}

export const sendMessage = async(token,id,message,dispatch,messages,feFile)=>{
        const file = feFile ? feFile : null;
        console.log("fefile from chat msg-->",file)
    try{
        const res = await apiConnector("POST",SEND_MESSAGE,{id,message,file},{
                             "Content-Type":"multipart/form-data",
                             Authorization:`Bearer ${token}`
        })
        
        
        if(messages === undefined){
            // console.log("i am in the if")
            // if we apply spread operator here e.g setMessages([...messages,res.data.data]) 
            // so message is undefined so it will give "message is not iterable error"
            dispatch(setMessages([res.data.data]))
        }
        else{
            // console.log("i am in the else")
            dispatch(setMessages([...messages,res.data.data]))
        }

       
    }catch(error){
        console.log("error in the send message api -->",error);
    }
}