import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    chatId: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
    sender: { type: mongoose.Schema.Types.objectId, ref: "User" },
    content: { type: String },
  },
  { timestamps: true }
);

export const messageModel = new mongoose.Model("Message", messageSchema);
