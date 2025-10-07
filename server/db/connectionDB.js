
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return mongoose.connection.readyState;
  }
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // Keep the connection across invocations in serverless
      serverSelectionTimeoutMS: 5000
    });
    isConnected = true;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn.connection.readyState;
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    // Do not exit the process on Vercel serverless
    throw error;
  }
};

export default connectDB;

