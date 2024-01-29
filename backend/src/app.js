import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";

//dotEnv config
dotenv.config();

//create express app
const app = express();

//morgan
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.send("Hello from server");
});

export default app;
