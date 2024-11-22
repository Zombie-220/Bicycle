import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 5000;
const url = 'mongodb://root:pass@localhost:27017/';
const dbName = 'bicycle';

let db;

MongoClient.connect(url)
.then(client => {
    console.log('success: Connected to MongoDB');
    db = client.db(dbName);
}).catch(err => {
    console.log('error: Failed to connect to MongoDB');
    process.exit(1);
});

app.use(cors());
app.use(bodyParser.json());

app.get('/newBicycles', async (req, res) => {
    try {
        const items = await db.collection('newBicycles').find().toArray();
        res.json(items);
        console.log('success: newBicycle');
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log('failed: GET * FROM newBicycle');
    }
});

app.post('/test', (req, res) => {
    console.log(req.body);
    res.json({result: "XX"});
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});