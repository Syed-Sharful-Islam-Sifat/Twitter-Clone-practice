import Message from "@/models/messages";
import { dbConnect } from "@/config/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export  async function getAllMessages(req,res){
   
   try{

     await dbConnect();
     const allMessages = await Message.find();
    
     return allMessages;

   }catch(error){
     console.log('error on getMessages service',error);
   }
}

export  async function createMessage(req,res){
   try{
      await dbConnect();
     const {firstUserId,secondUserId} = req.body;
       const message = await Message.create({
        firstUserId,
        secondUserId
       })

       return message;
   }catch(error){
     console.log('error on message create service',error)
   }
}

export  async function sendNewMessage(req,res){


    try{
        const {messageId,senderId,receiverId,text} = req.body;

        console.log('new messages on getMessageServices',messageId,senderId,receiverId,text)

        await dbConnect();
    
            const mainMessage = await Message.findById(messageId);

            if(!mainMessage){
               throw new Error('No Message exists')
            }

            mainMessage.messages.push({
                senderId,
                receiverId,
                text,
              })

            await mainMessage.save();  

            const lastMessage = {
              senderId,
              receiverId,
              text
            }


            return lastMessage;
        
    }catch(error){
      console.log('error',error);
    }


}

export  async function getSingleMessage(req,res){
  try{
     await dbConnect();
    const {messageId} = req.query;
     console.log('req.body on getSingleMessage',req.query)
      const message = await Message.findById(messageId);
      return message;
  }catch(error){
    console.log('error on single message get service',error)
  }
}

export async function getNotifications(req,res,session){

  try {
   
    await dbConnect();

  

    const users = await Message.distinct('messages.senderId', {
      $and: [
        { 'messages.receiverId': session.id },
        { 'messages.seen': false }
      ],
    });
    console.log("session and unSeenMessagesUsers",session, users);

    return users;
  } catch (error) {
    console.log(error);
  }
}
