import mongoose, { Document, Schema, Types } from "mongoose";

export interface Iclass extends Document {
  className: string;
  teacherId: Types.ObjectId;
  studentIds: [Types.ObjectId];
  createdAt: Date;
}

const classSchema = new Schema<Iclass>(
  {
    className: {
      type: String,
      required: true,
    },

    teacherId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    studentIds: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<Iclass>("Class", classSchema);
