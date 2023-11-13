import { dbConnect } from '@/config/db';
import Message from '@/models/messages';
export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'PUT') {
    try {
      const messages = await Message.find();

      for (const message of messages) {

        if(!message.lastMessage&&message.messages.length){

          const lastIndex = message.messages.length;

          const senderId = message.messages[lastIndex].senderId;
        
          message.lastMessage = {
             seen:'pending',
             userId: senderId
             
          }
        }

        await message.save();
      }

      return res.status(200).json({ message: 'Database updated successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Database update failed' });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
