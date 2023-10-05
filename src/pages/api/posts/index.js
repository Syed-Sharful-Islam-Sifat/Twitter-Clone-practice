import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { dbConnect } from "@/config/db";
import Post from "@/models/posts";
export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const session = await getServerSession(req, res, authOptions);

      console.log("session", session);

      const { id } = session;

      const { contentType, text } = req.body;

      const post = await Post.create({
        userId: id,
        contentType,
        text,
      });

      return res.status(200).json(post);
    }

    if (req.method === "GET") {
      dbConnect();
      const posts = await Post.find().sort({ createdAt: -1 });
      return res.status(200).json(posts);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}
