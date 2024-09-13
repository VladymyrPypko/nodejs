import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME;
let db, itemsCollection;

const connectDB = async () => {
  if (!db) {
    const client = await MongoClient.connect(MONGO_URL);
    db = client.db(DB_NAME);
    itemsCollection = db.collection('items');
    console.log(`Connected to DB: ${DB_NAME}`);
  }
  return { db, itemsCollection };
};

export const createItem = async (item) => {
  await connectDB();
  return await itemsCollection.insertOne(item);
};

export const getAllItems = async () => {
  await connectDB();
  return await itemsCollection.find().toArray();
};

export const getItemById = async (id) => {
  await connectDB();
  return await itemsCollection.findOne({ _id: new ObjectId(id) });
};

export const updateItem = async (id, item) => {
  await connectDB();
  return await itemsCollection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: item }
  );
};

export const deleteItem = async (id) => {
  await connectDB();
  return await itemsCollection.findOneAndDelete({ _id: new ObjectId(id) });
};
