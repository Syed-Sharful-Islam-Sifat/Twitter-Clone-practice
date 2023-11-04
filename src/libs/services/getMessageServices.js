import Message from "@/models/messages";
import { dbConnect } from "@/config/db";

export  async function getAllMessages(req,res){
   
   try{

     await dbConnect();
     const allMessages = await Message.find();
     console.log('allMessages on getMessageServices',allMessages)
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

            return mainMessage;
        
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
