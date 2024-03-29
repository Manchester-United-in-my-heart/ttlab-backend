import { MongoClient } from 'mongodb';
import { config } from 'dotenv';

config();

export const client = new MongoClient(process.env.MONGO_URI, {});
