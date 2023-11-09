import { getNotifications } from "@/libs/services/getMessageServices";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

export default async function handler(req, res) {
    switch(req.method){
        case "GET":{
           const session = await getServerSession(req,res,authOptions);
           console.log('session on notification api',session)
           const unseenMessagesUsers = await getNotifications(req, res,session);
           console.log('UnseenMessagesusers',unseenMessagesUsers)
           return res.status(200).json(unseenMessagesUsers);
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
}
