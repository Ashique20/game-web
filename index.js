const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.Port||5000

app.use(cors())
app.use(express.json())



const uri = "mongodb+srv://game_user:nJBj495gUd2bsGUq@cluster0.0b46zlg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();

    const matchCollection = client.db("gameData").collection("matches")

    app.get('/matches',async(req,res)=>{
    
      const result = await matchCollection.find().toArray()
      res.send(result)
    })
    app.get('/matches/:id',async(req,res)=>{
      const id = req.params.id
      const filter ={_id:new ObjectId(id)}
      const result  = await matchCollection.findOne(filter)
      res.send(result)
    })
    
    
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
   
  }
}
run().catch(console.dir);


app.get('/',async(req,res)=>{
    res.send('running')
})

app.listen(port,()=>{
    console.log(`running ${port}`)
})