
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

let isConnected = false;

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log('Already connected to MongoDB');
      return true;
    }

    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully');
    return true;
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    throw error;
  }
};

export default connectDB;

