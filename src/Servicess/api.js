
const BASE_URL = process.env.REACT_APP_BASE_URL

export const authEndpoint={

    SENDOTP_API: BASE_URL + "/sendotp" ,
    SIGNUP_API: BASE_URL + "/signup" ,
    LOGIN_API: BASE_URL + "/login" ,
    RESETPASSTOKEN_API: BASE_URL + "/reset-pass-token" ,
    RESETPASSWORD_API: BASE_URL + "/reset-pass" ,

}

export const messageEndpoint ={
    SEND_MESSAGE:BASE_URL + "/sendmessage"  ,
    GET_MESSAGES:BASE_URL + "/getallmessage"  ,
    GET_ALL_USER:BASE_URL + "/getalluser"  ,
    // SEND_MESSAGE:"/sendmessage"  ,
    // GET_MESSAGES:"/getallmessage"  ,
    // GET_ALL_USER:"/getalluser"  ,
}