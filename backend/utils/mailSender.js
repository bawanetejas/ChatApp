const nodemailer = require("nodemailer")
require("dotenv").config();

const mailSender = async(email,title,body)=>{
       
    try{
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            }
        })
        // console.log("data in mail -->",email,title,body)
        let info = await transporter.sendMail({
            from:'Grow with peer || bawanetej89@gmail.com',
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`
        })
        // console.log("info from the mail -->",info)
        return info;
    }catch(error){
        console.log("error in mailsender function",error.message)
    }
}

module.exports = mailSender;