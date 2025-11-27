import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
let client;
let clientPromise: Promise<MongoClient>;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (!global._mongoClientPromise) {
  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export async function getDB() {
  const client = await clientPromise;
  return client.db("main"); // nama database, bebas mau diganti
}
