import express from "express";
import asyncHandler from "express-async-handler";
import { authValidator } from "../config/authValidator.js";
import { chatModel } from "../schemas/chatSchema.js";

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
        .populate({ path: "latestMessage", select: "-__v" })
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

chatController.post(
  "/create",
  asyncHandler(async (req, res) => {
    if (!req.body.users) {
      console.error("payload invalid");
      res.status(400).send({
        message: "invalid payload",
        success: false,
      });
    }
    try {
      const users = req.body.users;
      const chatName = req.body.chatName;

      const chatData = new chatModel({
        chatName,
        isGroupChat: users.length > 1,
        groupAdmin: req.userId,
        users: [...users, req.userId],
      });

      const result = await chatData.save();

      if (result) {
        const chatData = await chatModel
          .find({ _id: result._id })
          .select("-__v")
          .populate({ path: "latestMessage", select: "-__v" })
          .populate({ path: "groupAdmin", select: "-password -__v" })
          .populate({ path: "users", select: "-password -__v" })
          .lean();

        const data = {
          ...chatData[0],
          groupAdmin: {
            name: chatData[0].groupAdmin.name,
            email: chatData[0].groupAdmin.email,
            profilePicture: chatData[0].groupAdmin.profilePicture,
            userId: chatData[0].groupAdmin._id,
          },
          users: chatData[0].users.map((user) => ({
            name: user.name,
            email: user.email,
            profilePicture: user.profilePicture,
            userId: user._id,
          })),
        };

        res.status(200).send({
          data,
          message: "chat created successfully",
          success: true,
        });
      }
    } catch (e) {
      console.error("error while creating chat", e);
      res.status(401).send({
        message: "error occurred while creating chat ",
        success: false,
      });
    }
  })
);

export { chatController };
