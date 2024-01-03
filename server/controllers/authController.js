import express from "express";
import { userModel } from "../schemas/userSchema.js";
import asyncHandler from "express-async-handler";
import { generateAuthToken } from "../utils/generateAuthToken.js";
import bcrypt from "bcryptjs";

const authController = express.Router();

authController.post(
  "/login",
  asyncHandler(async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        console.error("all fields are required");
        res
          .status(401)
          .send({ message: "all fields are required", success: false });
        return;
      }

      const userDataFromDB = await userModel.find({ email }).exec();
      if (userDataFromDB.length) {
        const isPasswordCorrect = await bcrypt.compare(
          password,
          userDataFromDB[0].password
        );
        if (isPasswordCorrect) {
          const token = await generateAuthToken({
            userId: userDataFromDB[0]._id,
          });
          res.status(200).send({
            message: "login successful",
            data: {
              userId: userDataFromDB[0]._id,
              name: userDataFromDB[0].name,
              email: userDataFromDB[0].email,
              profilePicture: userDataFromDB[0].profilePicture || "",
              token,
            },
            success: true,
          });
          return;
        } else {
          console.error("Incorrect password");
          res
            .status(200)
            .send({ message: "Invalid email or password ", success: false });
          return;
        }
      } else {
        console.error("Incorrect email");
        res
          .status(200)
          .send({ message: "Invalid email or password ", success: false });
        return;
      }
    } catch (e) {
      console.error(e);
      res.status(401).send({
        message: "exception occurred while logging user In",
        success: false,
      });
      return;
    }
  })
);

authController.post(
  "/register",
  asyncHandler(async (req, res) => {
    try {
      const { name, email, password, profilePicture } = req.body;

      if (!name || !email || !password) {
        console.error("all fields are required");
        res
          .status(401)
          .send({ message: "all fields are required", success: false });
        return;
      }

      //check if the user already exists
      const result = await userModel.find({ email });
      if (result.length) {
        console.error("user already exists");
        res
          .status(200)
          .send({ message: "User already exists", success: false });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const userData = new userModel({
        name,
        email,
        password: hashedPassword,
        profilePicture,
      });
      const savedData = await userData.save(userData);

      const token = await generateAuthToken({ userId: savedData._id });

      if (savedData) {
        res.status(200).send({
          message: "user registered successfully",
          data: {
            name: savedData.name,
            email: savedData.email,
            profilePicture: savedData.profilePicture,
            userId: savedData._id,
          },
          token,
          success: true,
        });
        return;
      }
    } catch (e) {
      console.error(e);
      res.status(401).send({
        message: "exception occurred while registering user",
        success: false,
      });
    }
  })
);
export { authController };
