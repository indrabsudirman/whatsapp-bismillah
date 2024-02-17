import express from "express";
import authRoute from "./auth.route.js";
import conversationRoutes from "./conversation.route.js";
import messageRoutes from "./message.route.js";
import usersRoute from "./user.route.js";

const router = express.Router();

router.use("/auth", authRoute);
router.use("/user", usersRoute);
router.use("/conversation", conversationRoutes);
router.use("/message", messageRoutes);

export default router;
