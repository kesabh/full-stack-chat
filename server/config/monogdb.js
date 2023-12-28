import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    mongoose.connection.on("connected", () =>
      console.log("database connected")
    );
  } catch (e) {
    console.error("error in connecting to mongodb", e);
  }
};
