
const express = require("express");
const Auth = require("../controller/Auth")
const router  = express.Router();

const {sendOtp,signup,login,resetPassToken,resetPassword} = Auth


router.post('/sendotp',sendOtp);

router.post("/signup",signup)

router.post("/login",login)

router.post("/reset-pass-token",resetPassToken)

router.post("/reset-pass",resetPassword)
module.exports = router;