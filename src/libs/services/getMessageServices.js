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
    const user = await User.findById(session.id);
    console.log('user on getnotification',user)
    return user;
  } catch (error) {
    console.log(error);
  }
}

export async function updateNotifications(req,res,session,payload){

  try {
   
    await dbConnect();
    const user = await User.findById(payload.receiverId);
    console.log('user and payload on updateNotification',user,payload);
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
    console.log('on deleteNotification',payload)
    await dbConnect();
    const user = await User.findById(payload.sessionId);
    if(user.notifications.includes(payload.userId)){
        user.notifications.pull(payload.userId);
        await user.save();
    }

    console.log('after deleteeeeeeeeeeeeeeeeee',user)
    return user;
  } catch (error) {
    console.log(error);
  }
}
