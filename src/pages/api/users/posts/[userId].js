import { dbConnect } from "@/config/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import User from "@/models/users";
import Post from "@/models/posts";

export default async function handler(req, res) {
  if (req.method === 'GET') {
      await dbConnect();
      const { userId } = req.query;
      const page = parseInt(req.query.page)||0;
      const limit = parseInt(req.query.limit)|| 2;
      console.log('page and limit',page,limit)
      // Find the posts where the user's ID is in the retweetIds array or the user is the author
      const posts = await Post.find({   
          contentType:'post',
          userId: userId 
          
      })
          .sort({ createdAt: -1 })
          .skip(page*limit)
          .limit(limit)
          .populate({
              path: 'userId',
              model: 'User',
          })
          .populate({
              path: 'commentIds',
              model: 'Post',
              options: { sort: { createdAt: -1 } },
              populate: [
                  {
                      path: 'userId',
                      model: 'User',
                  },
                  {
                      path: 'commentIds',
                      model: 'Post',
                      options: { sort: { createdAt: -1 } },
                      populate: [
                          {
                              path: 'userId',
                              model: 'User',
                          },
                          // Add more population as needed for deeper nesting
                      ],
                  },
              ],
          }).populate({
            path: 'retweetId',
            model: 'User'
          }) ;

          console.log('posts',posts)

      return res.status(200).json({ posts });
  }
}
