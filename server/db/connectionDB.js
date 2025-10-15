
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

let isConnected = false;

const connectDB = async () => {
  if (isConnected && mongoose.connection.readyState === 1) {
    console.log('Using existing MongoDB connection');
    return mongoose.connection.readyState;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // Serverless-optimized settings
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      bufferCommands: false,
      bufferMaxEntries: 0,
      maxPoolSize: 1, // Maintain only one connection in serverless
      minPoolSize: 0,
      maxIdleTimeMS: 30000,
      connectTimeoutMS: 10000
    });

    isConnected = true;
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
      isConnected = false;
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
      isConnected = false;
    });

    return conn.connection.readyState;
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    isConnected = false;
    // In serverless, we don't want to crash the entire function
    // Just log the error and let the app continue
    return 0; // Return disconnected state
  }
};

export default connectDB;

