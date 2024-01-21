import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Database Connected!!");
  })
  .catch((err) => {
    console.log("err");
  });

const app = express();

app.listen(3000, () => {
  console.log(`listening on 3000`);
});
