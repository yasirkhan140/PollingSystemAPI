import mongoose from "mongoose";
import { DB_NAME } from "../contant.js";
// connect the mongoDb
const connectDB = async () => {
  try {
    const connectInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `MONGODB connected !! DB HOST ${connectInstance.connection.host}`
    );
  } catch (error) {
    console.log(`MONGODB connection failed`, error);
    // exit from process
    process.exit(1);
  }
};

export default connectDB;
