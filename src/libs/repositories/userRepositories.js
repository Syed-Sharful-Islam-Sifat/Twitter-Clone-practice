import { dbConnect } from "@/config/db";
import User from "@/models/users";

export async function getUserRepo(id) {
  dbConnect();
  const user = await User.findById(id);
  return user;
}
export async function getFollowersRepo(userId) {
  dbConnect();
  const users = await User.find({ followingIds: userId });
  return users;
}
export async function getFollowingRepo(user) {
  dbConnect();
  const users = await User.find({ _id: { $in: user.followingIds } });
  return users;
}
export async function getNotFollowingRepo(mainUser, session) {
  dbConnect();
  const users = await User.find({
    _id: { $nin: mainUser.followingIds, $ne: session?.id },
    isVerified:true
  });
  return users;
}
export async function findUserByEmailRepo(email) {
  dbConnect();
  const userExists = User.findOne({ email });
  return userExists;
}
export async function createUserRepo(name, email, hash) {
  dbConnect();
  const user = await User.create({
    name,
    email,
    password: hash,
  });

  return user;
}
export async function userProfileUpdateRepo(userId, profileImage, coverPhoto) {
  dbConnect();
  const user = await User.findByIdAndUpdate(
    userId,
    { profileImage, coverPhoto },
    { new: true } // This ensures the updated document is returned
  );

  await user.save();
  return user;
}
export async function getAllUsersRepo(session) {
  dbConnect();
  const users = await User.find({ _id: { $ne: session.id } });
  return users;
}
