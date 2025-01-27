import express from 'express'

import db from './db.js'
import { ObjectId } from 'mongodb';

const app = express();

const port = 8080;

app.use(express.json());

app.get('/', async (req, res) => {
    try {
        const collection = await db.collection('posts')
        const results = await collection.find({}).limit(1).toArray()
        console.log('GET /')
        res.json(results).status(200)
    } catch(e) {
        console.log(e)
    }
})

app.get('/:id', async (req, res) => {
    try {
        const collection = await db.collection('posts')
        let query = { _id: new ObjectId(req.params.id) }
        const result = await collection.findOne(query)

        if (!result) res.send('404 Not Found').status(404)
        else res.send(result).status(200)
    } catch(e) {
        console.log(e)
        console.log("Error message:", e.message);
        console.log("Stack trace:", e.stack); // trying using stack trace
    }
})

app.post('/', async (req, res) => {
    const collection = await db.collection('posts')
    let newDocument = req.body
    console.log(newDocument)
    console.log('POST /')
    res.send('hello')
})

app.post('/', async (req, res) => {
    try {
        const collection = await db.collection('posts')
        let newDocument = req.body
        console.log(newDocument)
        newDocument.date = new date();
        console.log('POST /')
        const result = await collection.insertOne(newDocument)
        res.send(result).status(200)
    } catch(e) {
        console.log(e)
    }
})

app.patch('/:id', async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id)}
        const update = {
            $push: { comments: req.body }
        }

        const collection = await db.collection('posts')
        const result = await collection.updateOne(query, update)

        res.json(result).status(200)
    } catch(e) {
        console.log(e)
    }
})

app.delete('/:id', async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) }
        const collection = await db.collection('posts')
        const result = await collection.deleteOne(query)
        res.json(result).status(200)
    } catch(e) {
        console.log('Error Message:' + e.message)
        console.log('Stack Trace: ' + e.stack)
    }
})

app.listen(port, () => {
    console.log('Connected to server on port: ' + port)
})