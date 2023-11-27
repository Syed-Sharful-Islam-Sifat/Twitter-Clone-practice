import React from "react";
import Post from "@/models/posts";
import { dbConnect } from "@/config/db";
import {
  findPostServices,
  updateLikeService,
} from "@/libs/services/getPostServices";
export default async function handler(req, res) {
  try {
   
    if (req.method === "PATCH") {
      const { id, postId } = req.body;

      let post = await findPostServices(postId);
      const { updatedPost, hasLiked } = await updateLikeService(post, id);
      console.log('updatedPost and hasLiked',updatedPost,hasLiked)
      return res
        .status(200)
        .json({ likesCount: updatedPost.likeIds.length, hasLiked: hasLiked });
    }
  } catch (error) {
    return res.status(400).end();
  }
}
