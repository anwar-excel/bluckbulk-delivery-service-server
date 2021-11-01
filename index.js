const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 7000;
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.njfp6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

console.log(uri);

async function run() {
    try {
        await client.connect();
        const database = client.db("deliverydata");
        // const delivery_man = database.collection("delivery_man");
        const delivery_man = database.collection("users");
        const food = database.collection("food");
        //GET API
        app.get('/users', async (req, res) => {
            const cursor = delivery_man.find({});
            const users = await cursor.toArray();
            res.send(users);
        });
        //SINGLE ID
        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const user = await delivery_man.findOne(query);
            console.log('load user with id', id);
            res.send(user);
        })

        //POST API
        app.post('/users', async (req, res) => {
            const newMan = req.body;
            const result = await delivery_man.insertOne(newMan);
            console.log('hitting the post', req.body);
            console.log('added user', result);
            res.json(result);
        });

        // 
        app.put('/users/:id', async (req, res) => {
            const id = req.params.id;

            const filter = { _id: ObjectId(id) };


            // this option instructs the method to create a document if no documents match the filter
            const options = { upsert: true };
            // create a document that sets the plot of the movie
            const updateDoc = {
                $set: {
                    name: req.body.name,
                    email: req.body.email

                },
            };
            const result = await delivery_man.updateOne(filter, updateDoc, options);
            console.log(req.body);
            console.log(result);
            res.json(result);
        })

        //DELETE API
        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await delivery_man.deleteOne(query);
            console.log('deleting user with id ', result);
            res.json(result);
        })
        //GET API
        app.get('/food', async (req, res) => {
            const cursor = food.find({});
            const users = await cursor.toArray();
            res.send(users);
        });
        //SINGLE ID
        app.get('/food/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const user = await food.findOne(query);
            console.log('load user with id', id);
            res.send(user);
        })

        //POST API
        app.post('/food', async (req, res) => {
            const newMan = req.body;
            const result = await food.insertOne(newMan);
            console.log('hitting the post', req.body);
            console.log('added user', result);
            res.json(result);
        });

        // 
        app.put('/food/:id', async (req, res) => {
            const id = req.params.id;

            const filter = { _id: ObjectId(id) };


            // this option instructs the method to create a document if no documents match the filter
            const options = { upsert: true };
            // create a document that sets the plot of the movie
            const updateDoc = {
                $set: {
                    name: req.body.name,
                    email: req.body.email

                },
            };
            const result = await food.updateOne(filter, updateDoc, options);
            console.log(req.body);
            console.log(result);
            res.json(result);
        })

        //DELETE API
        app.delete('/food/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await food.deleteOne(query);
            console.log('deleting user with id ', result);
            res.json(result);
        })
        // // create a document to insert
        // const doc = {
        //     name: "namae",
        //     email: "email@gmail.com",
        // }
        // const result = await delivery_man.insertOne(doc);
        // console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);


// async function run() {
//     try {
//         await client.connect();
//         console.log('database connect successfully');
//     }
//     finally {
//         //await client.close();
//     }
// }

// run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('blackbuck-delivery-service-bd-server footer');
});

app.listen(port, () => {
    console.log('server running at port', port);
});