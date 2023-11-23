import Message from "@/models/messages";
import { dbConnect } from "@/config/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import User from "@/models/users";
import { createMessageRepo, deleteNotificationsRepo, getAllMessagesRepo, getNotificationsRepo, getSingleMessageRepo, updateNotificationsRepo, updateSeenandunSeenMessagesRepo, updateSingleMessageRepo } from "../repositories/messageRepositories";

export  async function getAllMessages(req,res,session){
   
   try{

     const allMessages = await getAllMessagesRepo();

    return allMessages

   }catch(error){
     console.log('error on getMessages service',error);
   }
}

export  async function createMessage(req,res){
   try{
      await dbConnect();
     const {firstUserId,secondUserId} = req.body;
       const message = await createMessageRepo(firstUserId,secondUserId);
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
      const {messageId} = req.query;
      const message = await getSingleMessageRepo(messageId);
      return message;
  }catch(error){
    console.log('error on single message get service',error)
  }
}

export async function getNotifications(req,res,session){

  try {
    const user = await getNotificationsRepo(session);
    return user;
  } catch (error) {
    console.log(error);
  }
}

export async function updateNotifications(req,res,session,payload){

  try {
    const user = await updateNotificationsRepo(payload)
    return user;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteNotifications(req,res,session,payload){

  try {
   
    const user = await deleteNotificationsRepo(payload);
    
    return user;
  } catch (error) {
    console.log(error);
  }
}

export async function updateSingleMessage(req,res,payload){
 // console.log('on updateSingleMessage',payload);
  
  const message = updateSingleMessageRepo(payload);
 
  return message;

}

export async function updateSeenandunSeenMessages(req,res,payload){
  await dbConnect();

  const message = await updateSeenandunSeenMessagesRepo(payload);
  return message;
}