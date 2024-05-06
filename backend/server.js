const express = require("express");
const coockieParser = require("cookie-parser")
const fileupload  =require("express-fileupload")

const auth = require("./routes/auth")
const message = require("./routes/message")
const cors  = require("cors")
const {dbConnect} = require('./dbServer/dbConnection');
const { app, server } = require("./socket/socket");
const { cloudinaryConnect } = require("./utils/cloudinary");


require("dotenv").config();


const PORT = process.env.PORT || 5000

//all middleware
app.use(express.json())
app.use(coockieParser())

app.use(fileupload({
        useTempFiles : true,
        tempFileDir : '/tmp/'
}))
// app.use(cors());
// we need to activate cors for other routes
app.use(
    cors({
        origin:'https://chat-app-three-azure.vercel.app',
        // origin:'http://localhost:3000',
        credentials:true,
        optionsSuccessStatus:200,
    })
)

app.use("/api/v1",auth)
app.use("/api/v1",message);

cloudinaryConnect();
dbConnect();
server.listen(PORT,()=>{
    console.log(`app is running at port ${PORT}`)
})



app.get('/',(req,res)=>{
    res.send("<h1>Hey how are you</h1>")
})