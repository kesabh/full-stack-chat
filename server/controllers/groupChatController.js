import express from "express";
import asyncHandler from "express-async-handler";
import { authValidator } from "../utils/authValidator.js";
import { createChat } from "../utils/createChat.js";

const groupChatController = express.Router();

groupChatController.use(authValidator);

groupChatController.post("/create", createChat);

export { groupChatController };
