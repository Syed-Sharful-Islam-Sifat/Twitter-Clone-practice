import { dbConnect } from "@/config/db";
import User from "@/models/users";

export async function getUserRepo(id){
    dbConnect();
    const user = await User.findById(id);
    return user;
}
export async function getFollowersRepo(userId){
    dbConnect();
    const users = await User.find({followingIds:userId});
    return users;
}
export async function getFollowingRepo(user){
    dbConnect();
    const users = await  User.find({_id:{$in: user.followingIds}});
    return users;
}
export async function getNotFollowingRepo(mainUser,session){
    dbConnect();
    const users = await User.find({
        _id:{$nin:mainUser.followingIds, $ne:session?.id}
    })
    return users;
}

