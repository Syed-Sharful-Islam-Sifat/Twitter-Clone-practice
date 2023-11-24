
import User from "@/models/users";
import { dbConnect } from "@/config/db";
import { getFollowerService, getUserService } from "@/libs/services/userServices";
export default async function handler(req,res){
     
    if(req.method==='GET'){

        const {userId} = req.query;
        const user  = await getUserService(userId); 
    
        const usersFollowers = await getFollowerService(userId);
      
    
        return res.status(200).json(usersFollowers);
    }
}