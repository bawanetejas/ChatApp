const express = require("express");
const router = express.Router();

const Messages = require("../controller/Messages")

//authentication middleware
const {auth} = require("../midleware/Authentication");
const SearchFriends = require("../controller/SearchFriends");


const {sendMessage,getAllMessage} = Messages;

router.post("/sendmessage",auth,sendMessage);

router.post("/getallmessage",auth,getAllMessage);

// get all user routes
const {getAllUser} = SearchFriends;
router.post("/getalluser",auth,getAllUser)

module.exports = router;