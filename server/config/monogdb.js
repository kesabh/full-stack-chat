import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    mongoose.connect(
      "mongodb+srv://goelkeshav1999:Demo1234@cluster0.x0hsg6v.mongodb.net/sandesh-vahak",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    mongoose.connection.on("connected", () =>
      console.log("database connected")
    );
  } catch (e) {
    console.error("error in connecting to mongodb", e);
  }
};
