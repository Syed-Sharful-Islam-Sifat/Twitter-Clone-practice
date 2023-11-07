
import User from "@/models/users";
import { dbConnect } from "@/config/db";
export default async function handler(req,res){
     
    if(req.method==='GET'){

        const {userId} = req.query;
        const user  = await User.findById(userId);
    
        const usersFollowers = await User.find({followingIds:userId});
      
    
        return res.status(200).json(usersFollowers);
    }
}