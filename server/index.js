import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectMongoDB } from "./config/monogdb.js";
import { authController } from "./controllers/authController.js";
import { userController } from "./controllers/userController.js";
import { authValidator } from "./config/authValidator.js";
import { chatController } from "./controllers/chatController.js";

const app = express();

dotenv.config();
connectMongoDB();

app.use(express.json());
app.use(cors());

app.use("/auth", authController);
app.use("/users", userController);
app.use("/chat", chatController);

userController.use(authValidator);
app.listen(5000);
