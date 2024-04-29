
import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    allFriends:[],
    chatFriend:null,
    messages:[],
}

export const chatSlice = createSlice({
    name:"chat",
    initialState,

    reducers:{
        setAllFriends(state,action){
            state.allFriends=action.payload
        },

        setChatFriend(state,action){
            state.chatFriend = action.payload
        },

        setMessages(state,action){
            state.messages = action.payload
        }
    }


})

export const {setAllFriends,setChatFriend,setMessages} =chatSlice.actions
export default chatSlice.reducer
