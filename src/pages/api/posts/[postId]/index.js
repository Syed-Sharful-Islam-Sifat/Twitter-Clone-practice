import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";
import { dbConnect } from "@/config/db";
import {
  deletePostServices,
  deleteReplyServices,
  findPostServices,
  getUpdatedPostServices,
  pullCommentServices,
  updatePostServices,
} from "@/libs/services/getPostServices";
import Post from "@/models/posts";

export default async function handler(req, res) {
  try {
    const session = await getServerSession(req, res, authOptions);
    const { postId } = req.query;

    if (req.method === "PUT") {
      dbConnect();
      const { text, image } = req.body;
      let post = await findPostServices(postId);
      post = await updatePostServices(post, text, image);
     
      const updatedPost = await getUpdatedPostServices(post._id);
      console.log('updatedPost and post',updatedPost,post);
      res.status(200).json(updatedPost);
    }

    if (req.method === "DELETE") {
      const { deletedPost, mainPostId } = await deletePostServices(postId);
      console.log('deletedPost and mainPostId',deletedPost,mainPostId)
      res.status(200).json({ deletedPost, mainPostId });
    }

    if (req.method === "GET") {
      const post = await findPostServices(postId);
      res.status(200).json(post);
    }

    if (req.method === "POST") {
      dbConnect();
    }
  } catch (error) {
    console.log({ error });
    res.status(400).end();
  }
}
