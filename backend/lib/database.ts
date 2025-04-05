import { MongoClient } from 'mongodb';

let cachedDb: MongoClient;

export async function connectDB() {
  if (cachedDb) return cachedDb;
  const client = await MongoClient.connect(process.env.MONGODB_URI!);
  cachedDb = client;
  return client.db('d90_bot');
}
