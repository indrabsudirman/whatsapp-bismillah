import createHttpError from "http-errors";
import validator from "validator";
import { UserModel } from "../models/index.js";
import bcrypt from "bcrypt";

//env data
const { DEFAULT_PICTURE, DEFAULT_STATUS } = process.env;

export const createUser = async (userData) => {
  const {
    name,
    email,
    phoneNumber,
    password,
    confirmPassword,
    picture,
    status,
  } = userData;

  //check if field are empty
  if (!name || !email || !phoneNumber || !password || !confirmPassword) {
    throw createHttpError.BadRequest("Please fill are fields.");
  }

  //check the name length
  if (
    !validator.isLength(name, {
      min: 5,
      max: 25,
    })
  ) {
    throw createHttpError.BadRequest(
      `Please make sure your name length between 5 - 25 characters. Your current name' length is ${name.length} characters`
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

  //check valid phone number
  if (
    !validator.isNumeric(phoneNumber) ||
    !validator.isLength(phoneNumber, {
      min: 10,
      max: 13,
    })
  ) {
    throw createHttpError.BadRequest(
      `Please provide a valid phone number, min 10 max 13 digits. Current is ${phoneNumber.length} digits`
    );
  }

  //check if user phone number already exist
  const checkPhoneNumberlDB = await UserModel.findOne({ phoneNumber });
  if (checkPhoneNumberlDB) {
    throw createHttpError.Conflict(
      `Your phone number ${phoneNumber} is already exist`
    );
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
    phoneNumber,
    password,
    picture: picture || DEFAULT_PICTURE,
    status: status || DEFAULT_STATUS,
  }).save();

  return user;
};

export const signUser = async (emailOrPhoneNumber, password) => {
  //check if user exist by email or phone number
  let user;
  if (validator.isNumeric(emailOrPhoneNumber)) {
    console.log("PhoneNumber : ", emailOrPhoneNumber);
    user = await UserModel.findOne({ phoneNumber: emailOrPhoneNumber }).lean();
  } else {
    console.log("Email : ", emailOrPhoneNumber);
    user = await UserModel.findOne({
      email: emailOrPhoneNumber.toLowerCase(),
    }).lean();
  }
  if (!user) throw createHttpError.Unauthorized("Invalid Credentials");

  //check password matches
  let passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches)
    throw createHttpError.Unauthorized("Invalid Credentials");

  return user;
};
