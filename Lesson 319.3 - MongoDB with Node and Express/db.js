import { MongoClient } from "mongodb";
// import connectionString from "./connStr.js";
let connectionString = 'mongodb+srv://Magneises:wordpass@activatework-guided-set.pse2v.mongodb.net/?retryWrites=true&w=majority&appName=ActivateWork-Guided-Setup';
const client = new MongoClient(connectionString)

let connection;

try {
    connection = await client.connect()
    console.log('MongoDB connected')
} catch(e) {
    console.log(e)
}

let db = connection.db('sample_training')

export default db