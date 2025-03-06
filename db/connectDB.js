import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log("Using existing database connection");
    return mongoose.connection.db; // ✅ Return the database instance
  }

  try {
    const connection = await mongoose.connect(MONGO_URI);

    isConnected = true;
    console.log("MongoDB Connected");
    return connection.connection.db; // ✅ Return the database instance
  } catch (error) {
    console.error("Database connection error:", error);
    throw new Error("Database connection failed");
  }
};

export default connectDB;
