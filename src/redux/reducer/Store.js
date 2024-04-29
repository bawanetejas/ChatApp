import { combineReducers } from "@reduxjs/toolkit";
import gala from "../slicess/AuthSlice";
import  chatSlice  from "../slicess/ChatSlice";

export const rootReducer = combineReducers({
    // "auth":authSlice,
    "auth":gala,
    "chat":chatSlice,
})