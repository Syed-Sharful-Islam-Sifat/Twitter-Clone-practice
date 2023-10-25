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

      const { parentId, name ,contentType, text , image } = req.body;
      console.log('on posts api',req.body,parentId,name,contentType,text,image);
      const post = await Post.create({
        userId: id,
        name,
        contentType,
        text,
        image,
        parentId
      });
      let mainPostId;
      if (contentType !== "post") {
        const parentPost = await Post.findById(parentId);

        await parentPost?.commentIds?.push(post?._id);
        await parentPost.save();

        if (contentType === "reply") {
          const mainPost = await Post.findById({ _id: parentPost.parentId });
          await mainPost.commentIds.push(post._id);
          await mainPost.save();
          mainPostId = mainPost._id;
        }
      }
      const user = await User.findById(id);

      await user?.posts?.push(post?._id);
      await user.save();

      const newPost = await Post.findById(post._id)
        .sort({ createdAt: -1 })
        .populate({
          path: 'userId',
          model: 'User'
        })
        .populate({
          path:"commentIds",
          model:"Post",
          options:{sort:{createdAt:-1}},
          populate: [
            {
              path: 'userId',
              model: 'User'
            },
            {
              path: 'commentIds',
              model: 'Post',
              options: { sort: { createdAt: -1 } },
              populate: [
                {
                  path: 'userId',
                  model: 'User'
                }
               
              ]
            }
          ]

        })
      return res.status(200).json({ newPost, parentId, mainPostId });
    }

    if (req.method === "GET") {
      await dbConnect();

      const session = await getServerSession(req, res, authOptions);

      const user = await User.findById(session.id);

      const followingIds = user.followingIds;

  
      const followedPosts = await Post.find({
           userId: { $in: followingIds },
           contentType: 'post'
      })
        .sort({ createdAt: -1 })
        .populate({
          path: 'userId',
          model: 'User'
        })
        .populate({
          path: "commentIds",
          model: "Post",
          options: { sort: { createdAt: -1 } },
          populate: [
            {
              path: 'userId',
              model: 'User'
            },
            {
              path: 'commentIds',
              model: 'Post',
              options: { sort: { createdAt: -1 } },
              populate: [
                {
                  path: 'userId',
                  model: 'User'
                }
                // Add more population as needed for deeper nesting
              ]
            }
          ]
        })
  
      return res.status(200).json({followedPosts});
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}
