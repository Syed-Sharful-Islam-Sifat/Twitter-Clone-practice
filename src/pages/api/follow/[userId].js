import User from "@/models/users";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { dbConnect } from "@/config/db";

export default async function handler(req,res){

   try{
       dbConnect();
      if(req.method==='GET'){
        const {userId} = req.query;
        const session = await getServerSession(req,res,authOptions);
       
       

        const user = await User.findById(session.id);
        const present = await user.followingIds.includes(userId);
      
        return res.status(200).json(present);
      }

      if(req.method==='PATCH'){
        dbConnect();
        let following;
        const {userId} = req.query;
        const session =  await getServerSession(req,res,authOptions);
        const user = await User.findById(session.id);
        if(user.followingIds.includes(userId)){
             following = false;
            user.followingIds.pull(userId);
        }
        else{
            following = true
            user.followingIds.push(userId);
            
        }

          await user.save();

          return res.status(200).json({followCount:user.followingIds.length,hasfollowed:following})
      }
   }catch(error){
    console.log(error);
    return res.status(400).end()
   }

}