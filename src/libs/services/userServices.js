import { dbConnect } from "@/config/db";
import { createUserRepo, findUserByEmailRepo, getAllUsersRepo, getFollowerServiceRepo, getFollowersRepo, getFollowingRepo, getNotFollowingRepo, getUserRepo, userProfileUpdateRepo } from "../repositories/userRepositories";
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
export async function findUserByEmailService(email){
    const userExists = findUserByEmailRepo(email);

    return userExists
}
export async function createUserService(name,email,hash){
    const user = await createUserRepo(name,email,hash);
    return user;
}
export async function userProfileUpdateService(userId,profileImage,coverPhoto){
  const user = await userProfileUpdateRepo(userId,profileImage,coverPhoto);
    return user;
}
export async function getAllUsersService(session){
  const users = await getAllUsersRepo(session);
    return users;
}




