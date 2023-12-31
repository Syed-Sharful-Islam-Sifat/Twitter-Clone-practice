import User from "@/models/users";
import { dbConnect } from "@/config/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { getAllUsersService } from "@/libs/services/userServices";
export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  try {
    dbConnect();
    const session = await getServerSession(req, res, authOptions);
    const users = await getAllUsersService(session);
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
