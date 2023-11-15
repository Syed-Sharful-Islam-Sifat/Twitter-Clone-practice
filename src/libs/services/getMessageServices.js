import Message from "@/models/messages";
import { dbConnect } from "@/config/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import User from "@/models/users";

export  async function getAllMessages(req,res,session){
   
   try{

     await dbConnect();

     const allMessages = await Message.find();

    return allMessages

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

              mainMessage.lastMessage ={
                seen: 'false',
                userId:senderId
              }

            await mainMessage.save();  

            const latestMessage = {
              senderId,
              receiverId,
              text,

              lastMessage:{
                seen: mainMessage.lastMessage.seen,
                userId: mainMessage.lastMessage.senderId
              }

            }


            return latestMessage;
        
    }catch(error){
      console.log('error',error);
    }


}

export  async function getSingleMessage(req,res,){
  try{
     await dbConnect();
    const {messageId} = req.query;
    
      const message = await Message.findById(messageId);
    // console.log('res.socket.io',res.server.socket.io)
      return message;
  }catch(error){
    console.log('error on single message get service',error)
  }
}

export async function getNotifications(req,res,session){

  try {
   
    await dbConnect();
    const user = await User.findById(session.id);
   
    return user;
  } catch (error) {
    console.log(error);
  }
}

export async function updateNotifications(req,res,session,payload){

  try {
   
    await dbConnect();
    const user = await User.findById(payload.receiverId);
   
    if(!user.notifications.includes(payload.senderId)){
        user.notifications.push(payload.senderId);
        await user.save();
    }
  
    return user;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteNotifications(req,res,session,payload){

  try {
   
    await dbConnect();
    const user = await User.findById(payload.sessionId);
    if(user.notifications.includes(payload.userId)){
        user.notifications.pull(payload.userId);
        await user.save();
    }

    
    return user;
  } catch (error) {
    console.log(error);
  }
}

export async function updateSingleMessage(req,res,payload){
 // console.log('on updateSingleMessage',payload);
  await dbConnect();
  const message = await Message.findById(payload.messageId);

  const seen = (payload.session.id===payload.newMessage.receiverId)?'true':'false'
  message.lastMessage.seen = seen;
  message.lastMessage.userId = payload.newMessage.senderId;

  await message.save();
 
  return message;

}

export async function updateSeenandunSeenMessages(req,res,payload){
  await dbConnect();

  const message = await Message.findById(payload.messageId);
  // console.log('message on updateSeenandUnseen',message);
   message.lastMessage.seen = 'true';

   await message.save();
   return message;
}