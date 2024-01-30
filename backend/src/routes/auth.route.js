
import express from "express";
import { login, register, logout, refreshToken } from "../controllers/auth.controller.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/refreshToken").post(refreshToken);

export default router;

