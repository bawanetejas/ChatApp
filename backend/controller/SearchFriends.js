
const User = require("../Models/user");

exports.getAllUser = async(req,res)=>{
    try{
        const userId= req.user.id;
         const allUser = await User.find({_id:{$ne:userId}}).select("-password");
        // console.log("hey this is me........")
         if(!allUser){
            return res.status(400).json({
                success:false,
                message:"Internal server error"
            })}

        return res.status(200).json({
            success:true,
            data:allUser,
            message:"all user fetched",
        })
    }catch(error){
        console.log("error in the get user -->",error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}