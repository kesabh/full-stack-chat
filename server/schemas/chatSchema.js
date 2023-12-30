import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    chatName: { type: String },
    latestMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
    isGroupChat: { type: Boolean },
    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

export const chatModel = new mongoose.model("Chat", chatSchema);
