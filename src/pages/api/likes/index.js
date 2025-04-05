import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { dbConnect } from "@/config/db";
import Post from "@/models/posts";
import {
  findPostServices,
  updateLikeService,
} from "@/libs/services/getPostServices";

export default async function handler(req, res) {
  try {
    const session = await getServerSession(req, res, authOptions);
    
    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (req.method === "GET") {
      await dbConnect();
      const posts = await Post.find({ likeIds: session.id });
      return res.status(200).json({ posts });
    }

    if (req.method === "PATCH") {
      const { id, postId } = req.body;

      let post = await findPostServices(postId);
      const { updatedPost, hasLiked } = await updateLikeService(post, id);
      console.log('updatedPost and hasLiked',updatedPost,hasLiked)
      return res
        .status(200)
        .json({ likesCount: updatedPost.likeIds.length, hasLiked: hasLiked });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("Error in likes API:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
