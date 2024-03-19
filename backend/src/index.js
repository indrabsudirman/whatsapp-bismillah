import mongoose from "mongoose";
import { Server } from "socket.io";
import app from "./app.js";
import logger from "./configs/logger.config.js";

//env variables
const { DATABASE_URL } = process.env;
const PORT = process.env.PORT || 8000;

//exit on mongodb error
mongoose.connection.on("error", (err) => {
  logger.error(`Mongo DB error ${err}`);
  process.exit(1);
});

//mongodb debug mode
if (process.env.NODE_ENV !== "production") {
  mongoose.set("debug", true);
}

//mongodb connection
mongoose
  .connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info("Connected to MongoDB");
  });

let server;

//log the ENV
logger.info(process.env.NODE_ENV);

server = app.listen(PORT, () => {
  logger.info(`App is litening at port : ${PORT}.`);
  // console.log("process id is ", process.pid);
});

//socket io
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.CLIENT_ENDPOINT,
  },
});

io.on("connection", (socket) => {
  logger.info(`socket io with id ${socket.id} successfully connected`);
  socket.on("sendMessage", (msg) => {
    logger.info(`get message ${msg}`);
    io.emit("receiveMessage", msg);
  });
});

//handle server error
const exitHandler = () => {
  if (server) {
    logger.info("Server closed.");
    process.exit(1);
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};
process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

//SIGTERM
process.on("SIGTERM", () => {
  if (server) {
    logger.info("Server closed.");
    process.exit(1);
  }
});
