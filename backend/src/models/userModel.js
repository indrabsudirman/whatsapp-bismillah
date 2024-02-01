import mongoose from "mongoose";
import validator from "validator";

const userScema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please povided your name"],
    },
    email: {
      type: String,
      required: [true, "Please provided your email"],
      unique: [true, "This email already exist"],
      lowercase: true,
      validate: [validator.isEmail, "Please provided a valid email"],
    },
    picture: {
      type: String,
      default:
        "https://res.cloudinary.com/dkd5jblv5/image/upload/v1675976806/Default_ProfilePicture_gjngnb.png",
    },
    status: {
      type: String,
      default: "Hey I am using Whatsapp!",
    },
    password: {
      type: String,
      required: [true, "Please provided your password"],
      minLength: [6, "Password length must be greater than 6 characters"],
      maxLength: [128, "Password length must be less than 128 characters"],
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

const UserModel =
  mongoose.model.UserModel || mongoose.model("UserModel", userScema);
export default UserModel;
