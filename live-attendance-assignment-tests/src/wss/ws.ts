import { WebSocketServer } from "ws";
import { WebSocket } from "ws";
import url from "url";
import { server } from "../server";
import type { Request } from "express";
import { WsError } from "../utils/wsError";
import jwt from "jsonwebtoken";
import { config } from "../config/env";
import { handleAttendanceMarked } from "./events/attendanceMarked";
import { handleTodaySummary } from "./events/todaySummary";

const wss = new WebSocketServer({ server, path: "/ws" });

export interface CustomWebSocket extends WebSocket {
  user: {
    id: string;
    role: "teacher" | "student";
  };
}

wss.on("connection", (ws: CustomWebSocket, req: Request) => {
  console.log("WS Server connected....");

  const parsedUrl = url.parse(req.url, true);
  const token = parsedUrl.query.token as string;

  if (!token) {
    ws.send(JSON.stringify(new WsError("Unauthorized or invalid token")));
    ws.close();
    return;
  }

  try {
    const decoded = jwt.verify(token, config.jwt_secret) as {
      id: string;
      role: "teacher" | "student";
    };

    ws.user = { id: decoded.id, role: decoded.role };
  } catch (err) {
    ws.send(JSON.stringify(new WsError("Unauthorized or invalid token")));
    ws.close();
    return;
  }

  ws.on("message", async function message(raw) {
    let parsed;
    try {
      parsed = JSON.parse(raw.toString());
    } catch (err) {
      ws.send(JSON.stringify(new WsError("Invalid message format")));
      return;
    }

    const { event, data } = parsed;

    switch (event) {
      case "ATTENDANCE_MARKED":
        await handleAttendanceMarked(ws, data, wss);
        break;
      case "TODAY_SUMMARY":
        await handleTodaySummary(ws, wss);
        break;
      default:
        ws.send(JSON.stringify(new WsError(`Unknown event`)));
    }
  });
});
