import { createSlice } from "@reduxjs/toolkit";

const initialState={
     loading:false,
     user:localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):null,
     signupdata:"",
     token:localStorage.getItem("token") ?
            JSON.parse(localStorage.getItem("token")):null
}
export const authSlice= createSlice({

     name:"auth",
     initialState,

     reducers:{
          setLoading(state,action){
               state.loading=action.payload;
          },
          setSignupdata(state,action){
               state.signupdata=action.payload
     
          },
          //when first time user login then we need to set the token
          setToken(state,action){
               state.token=action.payload
          },
          setUser(state,action){
               state.user=action.payload
          }
     }

})

export const {setLoading,setSignupdata,setToken,setUser} =authSlice.actions;
export default authSlice.reducer;