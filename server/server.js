import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";

// dot config
dotenv.config();

// database connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Database Connected!!");
  })
  .catch((err) => {
    console.log("err");
  });

//   express object
const app = express();

// Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  const statuscode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  return res.status(statuscode).json({
    success: false,
    statuscode,
    message,
  });
});

app.listen(8000, () => {
  console.log(`listening on 8000`);
});
