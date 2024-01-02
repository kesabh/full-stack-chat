import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import http from "http";

import { connectMongoDB } from "./config/monogdb.js";
import { authController } from "./controllers/authController.js";
import { userController } from "./controllers/userController.js";
import { authValidator } from "./config/authValidator.js";
import { chatController } from "./controllers/chatController.js";
import { messageController } from "./controllers/messageController.js";

const app = express();

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (clientSocket) => {
  console.log("connection established", clientSocket.id);
  clientSocket.on("join_room", (data) => {
    clientSocket.join(data);
  });

  clientSocket.on("send_message", (data) => {
    console.log("msg sent with data", data);
    data.receivers.forEach((receiverId) => {
      if (clientSocket.adapter.rooms.get(receiverId)) {
        clientSocket.to(receiverId).emit("receive_message", data.message);
      }
    });
  });

  clientSocket.on("user_typing", (data) => {
    console.log("user is typing");
    data.receivers.forEach((receiverId) => {
      if (clientSocket.adapter.rooms.get(receiverId)) {
        clientSocket.to(receiverId).emit("show_loader_for_user_typing", data);
      }
    });
  });

  clientSocket.on("stop_typing", (data) => {
    console.log("stop user from typing");
    data.receivers.forEach((receiverId) => {
      if (clientSocket.adapter.rooms.get(receiverId)) {
        clientSocket
          .to(receiverId)
          .emit("hide_loader_for_stopped_typing", data);
      }
    });
  });
});

dotenv.config();
connectMongoDB();

app.use(express.json());
app.use(cors());

app.use("/auth", authController);
app.use("/users", userController);
app.use("/chat", chatController);
app.use("/message", messageController);

userController.use(authValidator);
httpServer.listen(5000);
