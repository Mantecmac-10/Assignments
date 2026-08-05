import mongoose, { Document, Schema } from "mongoose";

export interface Iuser extends Document {
  name: string;
  email: string;
  password: string;
  role: "teacher" | "student";
  createdAt: Date;
}

const userSchema = new Schema<Iuser>(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["teacher", "student"],
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<Iuser>("User", userSchema);
