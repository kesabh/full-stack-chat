import express from "express";
import asyncHandler from "express-async-handler";
import { authValidator } from "../utils/authValidator.js";
import { messageModel } from "../schemas/messageSchema.js";
import { chatModel } from "../schemas/chatSchema.js";

const messageController = express.Router();

messageController
  .route("/")
  .get(
    asyncHandler(async (req, res) => {
      try {
        const { chatId } = req.query;

        const result = await messageModel
          .find({ chatId })
          .select("-_id -__v -updatedAt")
          .populate("sender")
          .lean();

        if (result) {
          res.status(200).send({
            data: result,
            success: true,
            message: "messages fetched successfully",
          });
        } else {
          console.error("error while fetching messages", e);
          res.status(200).send({
            message: "error occurred while fetching messages",
            success: false,
          });
        }
      } catch (e) {
        console.error("error while fetching messages", e);
        res.status(401).send({
          message: "error while fetching messages",
          success: false,
        });
      }
    })
  )
  .post(
    asyncHandler(async (req, res) => {
      try {
        const messageData = req.body;
        const message = new messageModel(messageData);

        const result = await message.save();
        if (result) {
          const updatedChat = await chatModel.findOneAndUpdate(
            { _id: messageData.chatId },
            { latestMessage: result._id },
            { new: true }
          );
          res.status(200).send({
            message: "message saved successfully",
            success: true,
          });
        } else {
          res.status(200).send({
            message: "error occurred while saving message",
            success: false,
          });
        }
      } catch (e) {
        console.error("error while saving message", e);
        res.status(401).send({
          message: "error while saving message",
          success: false,
        });
      }
    })
  );

messageController.use(authValidator);

export { messageController };
