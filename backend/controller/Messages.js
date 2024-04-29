
const User = require("../Models/user");
const cloudinary = require("cloudinary").v2;
const Message  =require("../Models/message");
const Conversation = require("../Models/conversation");
const { getReceiverSocketId, io } = require("../socket/socket");


async function cloudinaryUpload(file,folder){
    const options = {folder};

    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.sendMessage=async(req,res)=>{
    try{
        const feFile  = req?.files?.file;
        const {id:recieverId,message} = req.body;
        console.log("recieverId -->be send msf-->",req.body);

        if(!recieverId ){
            return res.status(404).json({
                success:false,
                message:"NO such user found orMessage"
            })
        }
        console.log("file from fe-->",feFile);
        const cres= feFile ? await cloudinaryUpload(feFile,"Happy"): null;
        const fileUrl = cres ? cres?.secure_url : null;
        console.log("cres -->",cres);

        const senderId = req.user.id;
        let  conversation = await Conversation.findOne({
            participants:{$all:[senderId,recieverId]}
        })

        if(!conversation){

            conversation = await Conversation.create({
                participants:[senderId,recieverId],
                messages:[]
            })

        }
        const messageBody = await Message.create({
                                            message,
                                            file:fileUrl,
                                            senderId,
                                            recieverId
        });

       await Conversation.findOneAndUpdate({
        participants:{$all:[senderId,recieverId]}},
        {$push:{messages:messageBody}},
        {new:true})

        // socket io 
        // get receiver socket id

        const recieverSocketId = getReceiverSocketId(recieverId)

        // io.to(receiverid).emit() this sends event to the spacific user

        if(recieverSocketId !== "undefied"){
            io.to(recieverSocketId).emit("newMessage",messageBody);
        }
        
        return res.status(200).json({
            success:true,
            message:"message sent successfully",
            data:messageBody
        })
    }catch(error){
        console.log("error in the send message -->",error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.getAllMessage=async(req,res)=>{
    try{  
          const {id:friendsId}=req.body;

        //   console.log("get all messages -->",friendsId)

          const senderId = req.user.id;

        //   console.log("senderid --> getallmessage",senderId)

          if(!friendsId){
            return res.status(400).json({
                success:false,
                message:"User does not exist"
            })}

            const conversation = await Conversation.findOne(
                                          {participants:{$all:[senderId,friendsId]}}).populate("messages");

            if(!conversation){
                return res.status(200).json([]);
                }

            return res.status(200).json({
                success:false,
                message:conversation.messages
            });
          
    }catch(error){
        console.log("error while getting the conversation -->",error);

        return res.status(500).json({
            success:false,
            message:"Internal sever error"
        })
    }
}