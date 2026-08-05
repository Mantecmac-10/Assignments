import mongoose from "mongoose";
import { config } from "./env";

export async function connectdb() {
  try {
    await mongoose.connect(`${config.mongo_url}/Attendance`);
    console.log("Mongodb is connected!");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
