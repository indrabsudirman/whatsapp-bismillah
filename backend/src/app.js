import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";

//dotEnv config
dotenv.config();

//create express app
const app = express();

//morgan
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

//helmet
app.use(helmet());

//parse JSON req url
app.use(express.json());

//parse JSON req body
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello from server");
});

//added sample post
app.post("/test", (req, res) => {
  res.send(req.body);
});

export default app;
