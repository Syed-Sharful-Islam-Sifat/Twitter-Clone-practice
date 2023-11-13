import { getSingleMessage, sendNewMessage } from "@/libs/services/getMessageServices";
import { updateSingleMessage } from "@/libs/services/getMessageServices";
export default async function handler(req,res){
    
    try{
        if(req.method==='POST'){

            const newMessage = await sendNewMessage(req,res);
            console.log('newMessage',newMessage)
            return res.status(200).json(newMessage)
        }

        if(req.method==='GET'){
            const message = await getSingleMessage(req,res);
            console.log('get message on single message api',message)
            return res.status(200).json(message)
        }

        if(req.method==='PATCH'){
            const {messageId,newMessage} = req.body;
            console.log('req.body on singlemessage update',req.body)
             const data = await updateSingleMessage(req,res,{messageId,newMessage});
             console.log('data on singlemessage update',data);
             return res.status(200).json(data)
        }

        
    }catch(error){
      console.log('error on singlemessage api',error);       
    }
}