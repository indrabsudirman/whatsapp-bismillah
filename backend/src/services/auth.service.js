import createHttpError from "http-errors";
import validator from "validator";
import { UserModel } from "../models/index.js";

//env data
const { DEFAULT_PICTURE, DEFAULT_STATUS } = process.env;

export const createUser = async (userData) => {
  const { name, email, password, confirmPassword, picture, status } = userData;

  //check if field are empty
  if (!name || !email || !password || !confirmPassword) {
    throw createHttpError.BadRequest("Please fill are fields.");
  }

  //check the name length
  if (
    !validator.isLength(name, {
      min: 5,
      max: 56,
    })
  ) {
    throw createHttpError.BadRequest(
      `Please make sure your name length between 5 - 56 characters. Your current name' length is ${name.length} characters`
    );
  }

  //check the status length
  if (
    status &&
    !validator.isLength(status, {
      min: 5,
      max: 56,
    })
  ) {
    throw createHttpError.BadRequest(
      `Please make sure your status length between 5 - 128 characters. Your current status' length is ${status.length} characters`
    );
  }

  //check valid email
  if (!validator.isEmail(email)) {
    throw createHttpError.BadRequest(
      `Please fill a valid email, your current email is ${email}`
    );
  }

  //check if user email already exist
  const checkEmailDB = await UserModel.findOne({ email });
  if (checkEmailDB) {
    throw createHttpError.Conflict(`Your email ${email} is already exist`);
  }

  //check password length
  if (
    !validator.isLength(password, {
      min: 6,
      max: 128,
    })
  ) {
    throw createHttpError.BadRequest(
      `Please make sure your password length between 6 - 128 characters. Your current password' length is ${password.length} characters`
    );
  }

  //check password and confirmPassword equal
  if (!validator.equals(password, confirmPassword)) {
    throw createHttpError.BadRequest(
      `Password and confirm password must be equal`
    );
  }

  const user = new UserModel({
    name,
    email,
    password,
    picture: picture || DEFAULT_PICTURE,
    status: status || DEFAULT_STATUS,
  }).save();

  return user;
};
