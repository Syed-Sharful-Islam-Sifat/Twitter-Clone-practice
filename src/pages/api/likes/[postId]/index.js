import React from "react";
import Post from "@/models/posts";
import { dbConnect } from "@/config/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";
import { findPostServices } from "@/libs/services/getPostServices";

export default async function handler(req, res) {
  try {
    const session = await getServerSession(req, res, authOptions);
    
    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { postId } = req.query;

    if (!postId) {
      return res.status(400).json({ error: "Post ID is required" });
    }

    if (req.method === "POST") {
      await dbConnect();
      const post = await findPostServices(postId);
      
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }

      const hasLiked = post.likeIds.includes(session.id);

      if (hasLiked) {
        post.likeIds = post.likeIds.filter((id) => id.toString() !== session.id);
      } else {
        post.likeIds.push(session.id);
      }

      await post.save();
      return res.status(200).json({ likesCount: post.likeIds.length, hasLiked: !hasLiked });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("Error in likes API:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}