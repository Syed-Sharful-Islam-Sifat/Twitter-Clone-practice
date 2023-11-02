import Message from "@/models/messages";
import { dbConnect } from "@/config/db";

export default async function getAllMessages(req,res){
   
   try{

     dbConnect();
     const allMessages = await Message.find();
     return allMessages;

   }catch(error){
     console.log('error on getMessages service',error);
   }
}

export default async function sendNewMessage(req,res){


    try{
        const {payload} = req.query;

        await dbConnect();
    
        if(!payload._id){
          
          const message =   await Message.create({
                _id: payload._id,
                senderId: payload.senderId,
                messages:[
                    {
                        text: payload.text,
                        image:payload.image
                    }
                ]
            })

            return res.status(200).json(message);
        }else{

            const mainMessage = await Message.findById(payload._id);

            mainMessage.messages.push({
                senderId: payload.senderId,
                receiverId: payload.receiverId,
                text: payload.text,
                image: payload.image
            })

            return res.status(200).json(mainMessage);
        }
    }catch(error){
      console.log('error',error);
    }


}
