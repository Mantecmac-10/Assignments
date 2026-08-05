import mongoose, { Document, Schema, Types } from "mongoose";

export interface IAttendance extends Document {
  classId: Types.ObjectId;
  studentId: Types.ObjectId;
  status: "present" | "absent";
}

const attendanceSchema = new Schema<IAttendance>({
  classId: {
    type: Schema.Types.ObjectId,
    ref: "Class",
    required: true,
  },

  studentId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  status: {
    type: String,
    enum: ["present", "absent"],
    required: true,
  },
});

export default mongoose.model<IAttendance>("Attendance", attendanceSchema);
