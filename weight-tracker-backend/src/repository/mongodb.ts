import { MongoClient } from "mongodb";
import { config } from "dotenv";

config();

const MONGO_URL = process.env.MONGO_URL;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME;

if (!MONGO_URL) {
	throw new Error("No MONGO_URL environment variable is set.");
}

console.log("Connecting To ", MONGO_URL);
export const client = new MongoClient(MONGO_URL);

const getCollection = (name: string) => client.db(MONGO_DB_NAME || "weight").collection(name);

export const getUsersCollection = () => getCollection("users");

export const getWeightCollection = () => getCollection("weight");