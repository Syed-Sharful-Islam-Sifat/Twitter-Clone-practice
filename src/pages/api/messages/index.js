import { createMessage, getAllMessages } from "@/libs/services/getMessageServices";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
export default async function handler(req,res){
    
    try{

        if(req.method==='GET'){
            
            try{
                const session = await getServerSession(req,res,authOptions);
                const messages = await getAllMessages(req,res,session.id);
                return res.status(200).json(messages);

            }catch(error){
               console.log('error on message api index.js',error);
               return res.status(400).end();
            }
        }
        if(req.method==='POST'){
            
            try{

                const message = await createMessage(req,res);

                return res.status(200).json(message)

            }catch(error){
               console.log('error on message api index.js',error);
               return res.status(400).end();
            }
        }
          
    }catch(error){
        console.log('error',error);

        return res.status(400).end();
    }
}