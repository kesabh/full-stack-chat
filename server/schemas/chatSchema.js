import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    latestMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
    isGroupChat: { type: boolean },
    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

export const chatModel = new mongoose.Model("Chat", chatSchema);
