import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

const connection = {};

async function connectDB() {
  if (connection.isConnected) {
    console.log('Using existing database connection');
    return;
  }

  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log('Using previous connection');
      return;
    }
    await mongoose.disconnect();
  }

  const db = await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log('New database connection established');
  connection.isConnected = db.connections[0].readyState;
}

async function disconnectDB() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === 'production') {
      await mongoose.disconnect();
      connection.isConnected = false;
      console.log('Database disconnected');
    } else {
      console.log('Not disconnecting database in development');
    }
  }
}

const db = { connectDB, disconnectDB };
export default db;