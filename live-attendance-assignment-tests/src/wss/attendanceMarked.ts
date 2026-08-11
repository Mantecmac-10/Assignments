import type { WebSocketServer } from "ws";
import type { CustomWebSocket } from "./ws";
import { WsError } from "../utils/wsError";
import { activeSession } from "../store/activeSession";
import classModel from "../models/class.model";
import { WsMessage } from "../utils/wsMessage";
import { broadcast } from "../utils/broadcast";

export const handleAttendanceMarked = async (
  ws: CustomWebSocket,
  data: any,
  wss: WebSocketServer,
) => {
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

  if (!classExist || classExist.teacherId?.toString() !== ws.user.id) {
    ws.send(JSON.stringify(new WsError("No active attendance session")));
    return;
  }

  const { studentId, status } = data ?? {};

  if (!studentId || !status) {
    ws.send(JSON.stringify(new WsError("Invalid payload")));
    return;
  }

  activeSession.attendance[studentId] = status;

  const message = new WsMessage("ATTENDANCE_MARKED", { studentId, status });

  broadcast(wss, ws, message);
};
