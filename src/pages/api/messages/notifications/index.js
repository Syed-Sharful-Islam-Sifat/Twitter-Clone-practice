import { deleteNotifications, getNotifications, updateNotifications } from "@/libs/services/getMessageServices";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import { dbConnect } from "@/config/db";
import { de } from "date-fns/locale";

export default async function handler(req, res) {
  
      try{

          const session = await getServerSession(req,res,authOptions);
        if(req.method==='GET'){
        
           console.log('session on notification api',session)
           const user = await getNotifications(req, res,session);
           const notifications = user.notifications
           return res.status(200).json(notifications);
        }

        if(req.method==='POST'){
            
            const {senderId,receiverId} = req.body;
             console.log('payload on post notification',req.body)
            const user = await updateNotifications(req,res,session,{senderId,receiverId});
            return res.status(200).json(user)
         }

        if(req.method==='DELETE'){
            
            console.log('DELETE method',req.body,session)
           const {sessionId,userId} = req.body
           const user = await deleteNotifications(req,res,session,{sessionId,userId});
           console.log('after delete notification',user)
           return res.status(200).json(user)
        }

      }catch(error){
        return res.status(400).end();
      }

}
//   try {
//     if (req.method === "GET") {

//       const unseenMessagesUsers = await getNotifications(req, res);

//       return res.staus(200).json(unseenMessagesUsers);
//     }
//   } catch (error) {
//     return res.staus(400).end();
//   }

