
import User from "@/models/users";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
export default async function handler(req,res){
     
    const {userId} = req.query;

    const session = await getServerSession(req,res,authOptions);
    const user  = await User.findById(userId);
    const mainUser = await User.findById(session.id)
    const usersFollowing = await User.find({_id:{$in: user.followingIds}});

    const usersNotFollowing = await User.find({
        _id:{$nin:mainUser.followingIds, $ne:session?.id}
    })


    return res.status(200).json({usersFollowing,usersNotFollowing});
}