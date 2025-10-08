require("dotenv").config();
const express = require("express");
const cors = require("cors");
const {MongoClient, ServerApiVersion} = require('mongodb');
const uri = "mongodb+srv://fastbyte:ITIS-3300@fastbyte.yzbabw6.mongodb.net/?retryWrites=true&w=majority&appName=FastByte";
const app = express();
app.use(express.json());

app.use(cors({ origin: "http://localhost:5173", credentials: true}));
const PORT = process.env.PORT || 5000;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1, 
    strict: true, 
    deprecationErrors: true, 
  }
})

async function run(){
  try{
    await client.connect();
    await client.db("admin").command({ ping: 1});
    console.log("Deployment Pinged. Successfully connected to MongoDB!");
  }finally{
    await client.close()
  }
}

run().catch(console.dir);
app.get("/", (req, res) => {
  res.send("FastByte API is running")
})
app.get("/api/ping", (req, res) => {
  res.json({ ok: true, msg: "pong"});
})

app.listen(PORT, () => {
  console.log(`🚀 API running on http://localhost:${PORT}`);
});
