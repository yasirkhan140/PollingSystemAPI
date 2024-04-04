import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./db/index.js";

// import env file
dotenv.config({
  path: "./.env",
});
// inilize app
const app = express();
// connect db and listen server
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000);
    console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
// limit on json
app.use(express.json({ limit: "16kb" }));
// url encoded
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
// cookie parse to excess cokkie
app.use(cookieParser());
