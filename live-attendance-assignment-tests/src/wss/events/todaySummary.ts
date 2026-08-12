import type { WebSocketServer } from "ws";
import type { CustomWebSocket } from "../ws";
import { WsError } from "../../utils/wsError";
import { activeSession } from "../../store/activeSession";
import classModel from "../../models/class.model";
import { WsMessage } from "../../utils/wsMessage";
import { broadcast } from "../../utils/broadcast";

export const handleTodaySummary = async (
  ws: CustomWebSocket,
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

  const array = Object.values(activeSession.attendance);

  const present = array.filter((a) => a === "present").length;

  const absent = array.filter((a) => a === "absent").length;

  const total = present + absent;

  const message = new WsMessage("TODAY_SUMMARY", {
    present,
    absent,
    total,
  });

  broadcast(wss, ws, message);
};
