import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import { DateTime } from "luxon";

const userSchema = mongoose.Schema(
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
    phoneNumber: {
      type: String,
      required: [true, "Please provided your phone number"],
      unique: [true, "This phone number already exist"],
      validate: [validator.isNumeric, "Please provided a valid phone number"],
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
    // timestamps: true,
    timestamps: {
      currentTime: () => DateTime.local().setZone("Asia/Jakarta"),
    },
  }
);

userSchema.pre("save", async function (next) {
  try {
    if (this.isNew) {
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
    }
    next();
  } catch (error) {
    next(error);
  }
});

const UserModel =
  mongoose.model.UserModel || mongoose.model("UserModel", userSchema);
export default UserModel;
