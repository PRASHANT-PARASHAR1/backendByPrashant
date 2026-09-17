import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected successfully");
    console.log("Database:", connection.connection.name);

    return connection;
  } catch (error) {
    console.log("MongoDB connection error:", error.message);
    throw error;
  }
};

export default connectDB;




