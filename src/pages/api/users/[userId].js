import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import User from "@/models/users";
import { userProfileUpdateService } from "@/libs/services/userServices";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const { userId } = req.query;
      // console.log('checking session and user',session.id,userId);
      if (typeof userId !== "string") throw new Error("Invalid userId");

      const user = await User.findById(userId);

      return res.status(200).json(user);
    }

    if (req.method === "PUT") {

      const { userId } = req.query;
      if (typeof userId !== "string") throw new Error("Invalid user");
    
       console.log(req.body)
       const {data} = req.body;
      if(!data)return res.status(400).json({error:'Invalid request '})
      const {profileImage,coverPhoto} = data;

      
      console.log('on server of userId',profileImage,coverPhoto);
      try {
        const user = await userProfileUpdateService(userId,profileImage,coverPhoto);
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
       
        return res.status(200).json(user);
      } catch (error) {
        return res.status(500).json({ error: "Server error" });
      }

    }
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
