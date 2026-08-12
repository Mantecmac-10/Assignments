import classModel from "../../models/class.model";
import { activeSession } from "../../store/activeSession";
import { WsError } from "../../utils/wsError";
import { WsMessage } from "../../utils/wsMessage";
import type { CustomWebSocket } from "../ws";

export const myAttendance = async (ws: CustomWebSocket) => {
  if (ws.user.role !== "student") {
    ws.send(JSON.stringify(new WsError("Forbidden, student event only")));
    ws.close();
    return;
  }

  if (!activeSession.classId) {
    ws.send(JSON.stringify(new WsError("No active attendance session")));
    return;
  }

  const classExist = await classModel.findById(activeSession.classId);
  const isEnrolled = classExist?.studentIds.some(
    (id) => id.toString() === ws.user.id,
  );

  if (!isEnrolled) {
    ws.send(JSON.stringify(new WsError("No active attendance session")));
    return;
  }

  if (!activeSession.attendance[ws.user.id]) {
    ws.send(
      JSON.stringify(
        new WsMessage("MY_ATTENDANCE", { status: "not yet updated" }),
      ),
    );
    return;
  }

  ws.send(
    JSON.stringify(
      new WsMessage("MY_ATTENDANCE", {
        status: activeSession.attendance[ws.user.id],
      }),
    ),
  );
};
