import User from "@/models/users";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import {
  getFollowingService,
  getNotFollowingService,
  getUserService,
} from "@/libs/services/userServices";
export default async function handler(req, res) {
  const { userId } = req.query;
  const session = await getServerSession(req, res, authOptions);
  const user = await getUserService(userId);
  const mainUser = await getUserService(session.id);
  const usersFollowing = await getFollowingService(user);
  const usersNotFollowing = await getNotFollowingService(mainUser, session);
  return res.status(200).json({ usersFollowing, usersNotFollowing });
}
