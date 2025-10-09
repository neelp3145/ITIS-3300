require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { url } = require("inspector");
const { create } = require("domain");
const customerRouter = require("./routes/customerRoutes");
const restaurantRouter = require("./routes/restaurantRoutes");
// const {MongoClient, ServerApiVersion} = require('mongodb');
// const uri = "mongodb+srv://fastbyte:ITIS-3300@fastbyte.yzbabw6.mongodb.net/?retryWrites=true&w=majority&appName=FastByte";
const app = express();
app.use(express.json());

app.use(cors({ origin: "http://localhost:5173", credentials: true}));
const PORT = process.env.PORT || 5000;

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1, 
//     strict: true, 
//     deprecationErrors: true, 
//   }
// })

// async function run(){
//   try{
//     await client.connect();
//     await client.db("admin").command({ ping: 1});
//     console.log("Deployment Pinged. Successfully connected to MongoDB!");
//   }finally{
//     await client.close()
//   }
// }

//run().catch(console.dir);
app.get("/", (req, res) => {
  res.send("This is the index endpoint");
})
app.get("/api/ping", (req, res) => {
  res.json({ ok: true, msg: "pong"});
})
app.listen(PORT, () => {
  console.log(`🚀 API running on http://localhost:${PORT}`);
});

app.use("/customer", customerRouter);
app.use("/restaurant", restaurantRouter);
