import User from "@/models/users";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { dbConnect } from "@/config/db";
import { getUserService, updateFollowingService, userFollowService } from "@/libs/services/userServices";

export default async function handler(req,res){

   try{
       dbConnect();
      if(req.method==='GET'){
        const {userId} = req.query;
        const session = await getServerSession(req,res,authOptions); 

        const user = await getUserService(session.id);
        const present = await userFollowService(user,userId);
      
        return res.status(200).json(present);
      }

      if(req.method==='PATCH'){
        dbConnect();
        const {userId} = req.query;
        const session =  await getServerSession(req,res,authOptions);
        let user = await getUserService(session.id);

       const {updatedUser,updatedFollowing} = await updateFollowingService(user,userId);
       user = updatedUser;
       console.log('updatedFollowing and updatedUser',updatedFollowing,updatedUser);
          return res.status(200).json({followCount:user.followingIds.length,hasfollowed:updatedFollowing})
      }
   }catch(error){
    console.log(error);
    return res.status(400).end()
   }

}