import mongoose from "mongoose";

let isConnected = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("using existing database connection");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {});
    isConnected = db.connections[0].readyState;
    console.log("new database connection");
  } catch (err) {
    console.log(err);
  }
};
