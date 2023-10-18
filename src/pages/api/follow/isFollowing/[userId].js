import User from "@/models/users";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

export default async function handler(req,res){

   try{
      if(req.method==='GET'){
        const {userId} = req.query;
        const session = await getServerSession(req,res,authOptions);
       
        console.log('session on follow api',session);

        const user = await User.findById(session.id);
        const present = await user.followingIds.includes(userId);

        return res.status(200).json(present);
      }
   }catch(error){
    console.log(error);
    return res.status(400).end()
   }

}