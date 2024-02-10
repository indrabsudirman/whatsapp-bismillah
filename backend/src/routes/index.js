import express from "express";
import authRoute from "./auth.route.js";
import conversationRoutes from "./conversation.route.js";

const router = express.Router();

router.use("/auth", authRoute);
router.use("/conversation", conversationRoutes);

export default router;
