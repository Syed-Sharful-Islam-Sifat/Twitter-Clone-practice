import { dbConnect } from "@/config/db";
import { getFollowerServiceRepo, getFollowersRepo, getFollowingRepo, getNotFollowingRepo, getUserRepo } from "../repositories/userRepositories";
import User from "@/models/users";
export async function getUserService(id) {
  const user = await getUserRepo(id);
  return user;
}

export async function userFollowService(user, userId) {
  return user.followingIds.includes(userId);
}
export async function updateFollowingService(user, userId) {
     dbConnect();
     let updatedFollowing;
    if(user.followingIds.includes(userId)){
        updatedFollowing = false;
        user.followingIds.pull(userId);
    }
    else{
        updatedFollowing = true;
        user.followingIds.push(userId);
        
    }

      await user.save();
      console.log('user on updatedFollowing Service',user,updatedFollowing)
      return{
        updatedUser:user,
        updatedFollowing
      }
}

export async function getFollowerService(userId){
   const users = await getFollowersRepo(userId);
   return users;
}

export async function getFollowingService(user){
    const users = await getFollowingRepo(user);
    return users;
}

export async function getNotFollowingService(mainUser,session){
    const usersNotFollowing = await getNotFollowingRepo(mainUser,session);

    return usersNotFollowing;
}


