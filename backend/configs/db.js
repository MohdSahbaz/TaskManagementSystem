import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/tms");
    console.log("Database connected");
  } catch (error) {
    console.log("Database connection fail!:", error);
  }
};

export default connectDB;
