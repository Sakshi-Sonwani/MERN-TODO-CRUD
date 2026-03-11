//const { MongoClient, Collection } = require('mongodb'); 
import { MongoClient } from 'mongodb';


const url = "mongodb+srv://sakshi:12345@cluster0.nzkxnbi.mongodb.net/node-project?retryWrites=true&w=majority";
const dbName = "node-project";
export const CollectionName = "todo";
const client = new MongoClient(url);   
export const connection=async ()=>{

     const connect = await client.connect();
     return await connect.db(dbName);
}
