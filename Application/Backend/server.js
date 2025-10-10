// Load environment variables from .env file
require("dotenv").config();

// Import core dependencies
const express = require("express");
const cors = require("cors");

// Import route modules
const customerRouter = require("./routes/customerRoutes");
const employeeRouter = require("./routes/employeeRoutes");
const orderRouter = require("./routes/orderRoutes");

// MongoDB dependencies
const { MongoClient, ServerApiVersion } = require("mongodb");

// MongoDB connection URI
const uri =
  "mongodb+srv://fastbyte:ITIS-3300@fastbyte.yzbabw6.mongodb.net/?retryWrites=true&w=majority&appName=FastByte";

// Initialize Express app
const app = express();

// Middleware: parse incoming JSON requests
app.use(express.json());

// Middleware: enable CORS for your frontend (e.g. React running on port 5173)
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Define server port (default to 5000 if not set in .env)
const PORT = process.env.PORT || 5000;

// Initialize MongoDB client
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Async function to test MongoDB connection
async function run() {
  try {
    // Attempt to connect to MongoDB
    await client.connect();

    // Send a ping command to verify successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Deployment Pinged. Successfully connected to MongoDB!");
  } finally {
    // Always close the client to avoid open connections
    await client.close();
  }
}

// Execute MongoDB connection test
run().catch(console.dir);

// Root endpoint for quick check
app.get("/", (req, res) => {
  res.send("This is the index endpoint");
});

// Simple API health check endpoint
app.get("/api/ping", (req, res) => {
  res.json({ ok: true, msg: "pong" });
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`🚀 API running on http://localhost:${PORT}`);
});

// Register route handlers
// Example: /customer -> handled by customerRouter
app.use("/customer", customerRouter);
app.use("/employee", employeeRouter);
app.use("/order", orderRouter);
