import type { WebSocketServer } from "ws";
import type { CustomWebSocket } from "../ws";
import { WsError } from "../../utils/wsError";
import { activeSession } from "../../store/activeSession";
import classModel from "../../models/class.model";
import attendanceModel from "../../models/attendance.model";
import { WsMessage } from "../../utils/wsMessage";
import { broadcast } from "../../utils/broadcast";

export const doneEvent = async (ws: CustomWebSocket, wss: WebSocketServer) => {
  if (ws.user.role !== "teacher") {
    ws.send(JSON.stringify(new WsError("Forbidden, teacher event only")));
    ws.close();
    return;
  }

  if (!activeSession.classId) {
    ws.send(JSON.stringify(new WsError("No active attendance session")));
    return;
  }

  const classExist = await classModel.findById(activeSession.classId);

  if (!classExist) {
    ws.send(JSON.stringify(new WsError("Class not found")));
    return;
  }

  if (classExist?.teacherId.toString() !== ws.user.id) {
    ws.send(JSON.stringify(new WsError("No active attendance session")));
    return;
  }

  const finalAttendance: Record<string, "present" | "absent"> = {};
  classExist.studentIds.forEach((studentId) => {
    const idStr = studentId.toString();
    finalAttendance[idStr] = activeSession.attendance[idStr] ?? "absent";
  });

  const results = await Promise.all(
    Object.entries(finalAttendance).map(([studentId, status]) =>
      attendanceModel.findOneAndUpdate(
        { classId: activeSession.classId, studentId },
        { classId: activeSession.classId, studentId, status },
        { upsert: true, returnDocument: "after" },
      ),
    ),
  );

  const values = Object.values(finalAttendance);
  const present = values.filter((s) => s === "present").length;
  const absent = values.filter((s) => s === "absent").length;
  const total = present + absent;

  const message = new WsMessage("DONE", {
    message: "Attendance persisted",
    present,
    absent,
    total,
  });

  broadcast(wss, ws, message);

  activeSession.classId = null;
  activeSession.startedAt = null;
  activeSession.attendance = {};
};
