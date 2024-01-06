import express from "express";
import asyncHandler from "express-async-handler";
import { authValidator } from "../utils/authValidator.js";
import { chatModel } from "../schemas/chatSchema.js";
import { createChat } from "../utils/createChat.js";

const chatController = express.Router();

chatController.use(authValidator);

chatController.get(
  "/",
  asyncHandler(async (req, res) => {
    try {
      const result = await chatModel
        .find({
          users: { $elemMatch: { $eq: req.userId } },
        })
        .select("-__v")
        .populate({
          path: "latestMessage",
          select: "-__v",
          populate: { path: "sender", select: "-password -__v", model: "User" },
        })
        .populate({ path: "groupAdmin", select: "-password -__v" })
        .populate({ path: "users", select: "-password -__v" })
        .sort({ "latestMessage.createdAt": "1" })
        .lean();

      if (result) {
        const data = result.map((chat) => ({
          ...chat,
          groupAdmin: {
            name: chat.groupAdmin.name,
            email: chat.groupAdmin.email,
            profilePicture: chat.groupAdmin.profilePicture,
            userId: chat.groupAdmin._id,
          },
          users: chat.users.map((user) => ({
            name: user.name,
            email: user.email,
            profilePicture: user.profilePicture,
            userId: user._id,
          })),
        }));

        res.status(200).send({
          data,
          message: "chats fetched successfully",
          success: true,
        });
      } else {
        console.error("some error occurred while getting chats");
        res.status(401).send({
          message: "some error occurred",
          success: false,
        });
      }
    } catch (e) {
      console.error("error while fetching chats", e);
      res.status(401).send({
        message: "error while fetching chats",
        success: false,
      });
    }
  })
);

chatController.post("/create", createChat);

export { chatController };
