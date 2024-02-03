import { createUser } from "../services/auth.service.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword, picture, status } =
      req.body;
    const newUser = await createUser({
      name,
      email,
      password,
      confirmPassword,
      picture,
      status,
    });
    res.json(newUser);
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
export const logout = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
export const refreshToken = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
