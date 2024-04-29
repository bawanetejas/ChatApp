
// const {Server} = require("socket.io")

// const http = require("http")

// const express = require("express")

// const app = express();

// const server = http.createServer(app);


// // created a socket server on top of the backend server
// const io = new Server(server,{
//     cors:{
//         origin: ["http://localhost:3000"],
        
//         allowedHeaders: ["my-custom-header"],
//         credentials: true,
          
//         methods:["GET","POST"]
//     }
// });


// // creating socket id store system where we can store the connected {userId : socketId} 

// const connectedUser ={};
// const getReceiverSocketId =(receiverId)=>{
//     return connectedUser[receiverId];
// }

// io.on("connection",(socket)=>{
//     console.log("my socket id-->from socket ",socket.id)

//     const userId  = socket.handshake.query.userId

//     if(userId){
//         connectedUser[userId]=socket.id;
//     }

//     // io.emit(eventName) it uses to send events to all connected clients

//     io.emit("getOnlineUsers",Object.keys(connectedUser));

//     // socket.on() us used to listen to the event

//     socket.on("disconnect",()=>{
//         console.log("disconnected socket id --->",socket.id)
//         delete connectedUser[userId];
//         io.emit("getOnlineUsers",Object.keys(connectedUser));
//     })

// });



const {Server} = require("socket.io")

const http = require("http")

const express = require("express")

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
	cors:{
		origin: ["https://chat-app-three-azure.vercel.app"],
		methods: ["GET", "POST"],
        credentials:true,
        optionsSuccessStatus:200,
	},
});

 const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};

const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
	console.log("a user connected", socket.id);

	const userId = socket.handshake.query.userId;
	if (userId != "undefined") userSocketMap[userId] = socket.id;

	// // io.emit() is used to send events to all the connected clients
	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	// socket.on() is used to listen to the events. can be used both on client and server side
	socket.on("disconnect", () => {
		console.log("user disconnected", socket.id);
		delete userSocketMap[userId];
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});
});

// export { app, io, server };
module.exports = {server,io,app,getReceiverSocketId}