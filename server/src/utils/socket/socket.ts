import { Server } from "socket.io";

let io: Server;

export function initSocket(server: any) {
  console.log("Socket is initialized");
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
}

export { io };
