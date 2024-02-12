import { createUser } from "../services/auth.service.js";
import { generateToken, verifyToken } from "../services/token.service.js";
import { signUser } from "../services/auth.service.js";
import { findUser } from "../services/user.service.js";
import createHttpError from "http-errors";

export const register = async (req, res, next) => {
  const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;
  try {
    const {
      name,
      email,
      phoneNumber,
      password,
      confirmPassword,
      picture,
      status,
    } = req.body;
    const newUser = await createUser({
      name,
      email,
      phoneNumber,
      password,
      confirmPassword,
      picture,
      status,
    });

    const access_token = await generateToken(
      {
        userId: newUser._id,
        phoneNumber: newUser.phoneNumber,
      },
      "1d",
      ACCESS_TOKEN_SECRET
    );
    const refresh_token = await generateToken(
      {
        userId: newUser._id,
        phoneNumber: newUser.phoneNumber,
      },
      "30d",
      REFRESH_TOKEN_SECRET
    );

    res.cookie("refreshtoken", refresh_token, {
      httpOnly: true,
      path: "/api/v1/auth/refreshtoken",
      maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
    });

    console.table({ access_token, refresh_token });
    res.json({
      message: "register success.",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
        picture: newUser.picture,
        status: newUser.status,
        token: access_token,
      },
    });
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res, next) => {
  const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;
  try {
    const { emailOrPhoneNumber, password } = req.body;
    const user = await signUser(emailOrPhoneNumber, password);

    const access_token = await generateToken(
      {
        userId: user._id,
        phoneNumber: user.phoneNumber,
      },
      "1d",
      ACCESS_TOKEN_SECRET
    );
    const refresh_token = await generateToken(
      {
        userId: user._id,
        phoneNumber: user.phoneNumber,
      },
      "30d",
      REFRESH_TOKEN_SECRET
    );

    res.cookie("refreshtoken", refresh_token, {
      httpOnly: true,
      path: "/api/v1/auth/refreshtoken",
      maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
    });

    console.table({ access_token, refresh_token });
    res.json({
      message: "login success.",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        picture: user.picture,
        status: user.status,
        token: access_token,
      },
    });
  } catch (error) {
    next(error);
  }
};
export const logout = async (req, res, next) => {
  try {
    res.clearCookie("refreshtoken", {
      path: "/api/v1/auth/refreshtoken",
    });
    res.json({
      message: "logged out !",
    });
  } catch (error) {
    next(error);
  }
};
export const refreshToken = async (req, res, next) => {
  const { REFRESH_TOKEN_SECRET, ACCESS_TOKEN_SECRET } = process.env;
  try {
    const refresh_token = req.cookies.refreshtoken;
    if (!refresh_token) throw createHttpError.Unauthorized("Please login.");
    const check = await verifyToken(refresh_token, REFRESH_TOKEN_SECRET);
    const user = await findUser(check.userId);
    const access_token = await generateToken(
      {
        userId: user._id,
        phoneNumber: user.phoneNumber,
      },
      "1d",
      ACCESS_TOKEN_SECRET
    );
    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        picture: user.picture,
        status: user.status,
        token: access_token,
      },
    });
  } catch (error) {
    next(error);
  }
};
