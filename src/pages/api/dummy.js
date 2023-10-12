import { dbConnect } from '@/config/db';
import Post from '@/models/posts';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'PUT') {
    try {
     
      await Post.updateMany(
        {contentType:'comment'}, 
        { $set: { replyIds: [] } } 
      );

      return res.status(200).json({ message: 'Database updated successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Database update failed' });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}