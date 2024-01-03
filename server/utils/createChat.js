import asyncHandler from "express-async-handler";
import { chatModel } from "../schemas/chatSchema.js";

export const createChat = asyncHandler(async (req, res) => {
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
});
