import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { dbConnect } from "@/config/db";
import Post from "@/models/posts";
import User from "@/models/users";
export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const session = await getServerSession(req, res, authOptions);

      console.log("session", session);

      const { id } = session;

      const { parentId,contentType, text } = req.body;

      
      const post = await Post.create({
        userId: id,
        contentType,
        text,
        parentId
      });

      if(contentType!=='post'){
        const parentPost = await Post.findById(parentId);

        await parentPost?.commentIds?.push(post?._id);
        await parentPost.save();

        if(contentType==='reply'){
          const mainPost = await Post.findById({_id:parentPost.parentId});
          await mainPost.commentIds.push(post._id);
          await mainPost.save();
        }
      }
      const user = await User.findById(id);

      await user?.posts?.push(post?._id);
      await user.save();
      return res.status(200).json(post);

    }

    if (req.method === "GET") {
      dbConnect();
      const posts = await Post.find({contentType:'post'}).sort({ createdAt: -1 });
      const allPosts = [];

      const singlepost = [];
      for(const post of posts){
         
        const comments = await Post.find({parentId:post._id}).sort({createdAt:-1});
        const postWithComments = {...post.toObject(),comments:[]}
      
        for(const comment of comments){
          const replies = await Post.find({parentId:comment._id}).sort({createdAt:-1});
          const commentsWithReplies = {...comment.toObject(),replies:replies};
          postWithComments.comments.push(commentsWithReplies);
          
        }

      
        allPosts.push(postWithComments);
      //  console.log('allPosts',allPosts)
      }
      return res.status(200).json(allPosts);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}
