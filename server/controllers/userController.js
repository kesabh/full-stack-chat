import express from "express";
import asyncHandler from "express-async-handler";
import { userModel } from "../schemas/userSchema.js";
import { authValidator } from "../config/authValidator.js";

const userController = express.Router();

userController.use(authValidator);

userController.get(
  "/",
  asyncHandler(async (req, res) => {
    try {
      const { searchText } = req.query;

      if (!searchText) {
        console.error("search text is empty");
        res.status(200).send({
          message: "search text is empty",
          success: false,
        });
      }

      const usersFromDB = await userModel.aggregate([
        {
          $match: {
            $or: [
              { name: { $regex: searchText } },
              { email: { $regex: searchText } },
            ],
          },
        },
        {
          $addFields: {
            userId: "$_id",
          },
        },
        {
          $project: {
            _id: 0,
            password: 0,
          },
        },
      ]);

      res.status(200).send({ data: usersFromDB, success: true });
    } catch (e) {
      console.error("error while fetching users", e);
      res.status(401).send({
        message: "error occurred while searching ",
        success: false,
      });
    }
  })
);

export { userController };
