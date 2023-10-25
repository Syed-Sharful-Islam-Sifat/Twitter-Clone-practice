import { dbConnect } from '@/config/db';
import Post from '@/models/posts';
import User from '@/models/users';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'PUT') {
    try {
      const posts = await Post.find();

      for (const post of posts) {
        const user = await User.findById(post.userId);

        if (!post.retweetIds) {
       
           post.retweetIds = [];
          await post.save();
        }
      }

      return res.status(200).json({ message: 'Database updated successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Database update failed' });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
