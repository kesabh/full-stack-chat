import express from "express";
import asyncHandler from "express-async-handler";
import { userModel } from "../schemas/userSchema.js";
import { authValidator } from "../utils/authValidator.js";

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

      let usersFromDB = await userModel
        .find({
          $and: [
            {
              $or: [
                { name: { $regex: searchText, $options: "i" } },
                { email: { $regex: searchText, $options: "i" } },
              ],
            },
            {
              _id: { $ne: req.userId },
            },
          ],
        })
        .select("name email _id profilePicture");

      usersFromDB = usersFromDB.map((user) => {
        return {
          name: user.name,
          email: user.email,
          userId: user._id,
          profilePicture: user.profilePicture,
        };
      });

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
