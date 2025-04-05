import { VercelRequest, VercelResponse } from '@vercel/node';
import { connectDB } from '../lib/database';

export default async (req: VercelRequest, res: VercelResponse) => {
  const { id } = req.query;
  const db = await connectDB();
  const status = await db.collection('active_bots').findOne({ _id: id });
  
  res.status(200).json(status || { error: 'Bot not found' });
};
