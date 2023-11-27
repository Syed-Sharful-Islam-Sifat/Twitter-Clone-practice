import { dbConnect } from "@/config/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import User from "@/models/users";
import Post from "@/models/posts";
import { getUserPostsService } from "@/libs/services/getPostServices";

export default async function handler(req, res) {
  if (req.method === 'GET') {
      await dbConnect();
      const { userId } = req.query;
      const page = parseInt(req.query.page)||0;
      const limit = parseInt(req.query.limit)|| 2;
      console.log('page and limit',page,limit)
      // Find the posts where the user's ID is in the retweetIds array or the user is the author
      const posts = await getUserPostsService(userId,page,limit);

          console.log('posts page and limiy',posts,page,limit)

      return res.status(200).json({ posts });
  }
}
