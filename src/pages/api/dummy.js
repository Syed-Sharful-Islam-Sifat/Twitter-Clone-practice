import { dbConnect } from '@/config/db';
import Post from '@/models/posts';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'PUT') {
    try {
      // Fetch all existing documents
      const posts = await Post.find();

      // Update each document to populate the commentIds field
      for (const post of posts) {
        // You may need to customize this logic based on your data
        // This is just a simple example
        post.commentIds = [];
        await post.save();
      }

      return res.status(200).json({ message: 'Database updated successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Database update failed' });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}