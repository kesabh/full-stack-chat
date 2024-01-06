import express from "express";
import asyncHandler from "express-async-handler";
import { authValidator } from "../utils/authValidator.js";
import { createChat } from "../utils/createChat.js";
import { chatModel } from "../schemas/chatSchema.js";

const groupChatController = express.Router();

groupChatController.use(authValidator);

groupChatController.post("/", createChat);
groupChatController.put(
  "/",
  asyncHandler(async (req, res) => {
    try {
      const users = req.body.users;
      const chatName = req.body.chatName;
      const chatId = req.body.chatId;

      const result = await chatModel.findOneAndUpdate(
        { _id: chatId },
        { chatName, users },
        { new: true }
      );

      if (result) {
        const chatData = await chatModel
          .find({ _id: result._id })
          .select("-__v")
          .populate({
            path: "latestMessage",
            select: "-__v",
            populate: {
              path: "sender",
              select: "-password -__v",
              model: "User",
            },
          })
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
          message: "chat updated successfully",
          success: true,
        });
      }
    } catch (e) {
      console.error("error while updating chat", e);
      res.status(401).send({
        message: "error occurred while updating chat ",
        success: false,
      });
    }
  })
);

export { groupChatController };
