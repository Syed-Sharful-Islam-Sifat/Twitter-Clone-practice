import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { dbConnect } from "@/config/db";
import Post from "@/models/posts";
import User from "@/models/users";
import {commentIncludeService, createPostService, findPostServices, followedPostsServices} from "@/libs/services/getPostServices";
import { getUserService } from "@/libs/services/userServices";
export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const session = await getServerSession(req, res, authOptions);

      console.log("session", session);

      const { id } = session;

      const { parentId, name ,contentType, text , image ,retweetId} = req.body;
      //console.log('on posts api',req.body,parentId,name,contentType,text,image,retweetId);
      const data = await createPostService( id , parentId, name ,contentType, text , image ,retweetId);
     // console.log('data on createPostServices',data);
      const {newPost,mainPostId} = data;
    //  console.log('newPost,mainPostId,parentId',mainPostId,parentId,newPost);
      return res.status(200).json({ newPost, parentId, mainPostId });
    }

    if (req.method === "GET") {
      await dbConnect();

      const session = await getServerSession(req, res, authOptions);

      const user = await getUserService(session.id);

      const followingIds = user.followingIds;
      const page = parseInt(req.query.page)||0;
      const limit = parseInt(req.query.limit)|| 2;
      const followedPosts = await followedPostsServices(session,page,limit,followingIds);
        console.log('followedPosts',followedPosts.length)
      return res.status(200).json({followedPosts});
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}
