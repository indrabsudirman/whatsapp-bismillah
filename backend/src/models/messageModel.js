import mongoose from "mongoose";
import moment from "moment";
import "moment-timezone";
import { DateTime } from "luxon";

const { ObjectId } = mongoose.Schema.Types;

const messageSchema = mongoose.Schema(
  {
    sender: {
      type: ObjectId,
      ref: "UserModel",
    },
    message: {
      type: String,
      trim: true,
    },
    conversation: {
      type: ObjectId,
      ref: "ConversationModel",
    },
    files: [],
  },
  {
    collection: "messages",
    timestamps: true,
    // timestamps: {
    //   currentTime: () => {
    //     let date = new Date();
    //     let newDate = new Date(
    //       date.getTime() + date.getTimezoneOffset() * 60 * 1000 * -1
    //     );
    //     return newDate;
    //   },
    // },
  }
);

const MessageModel =
  mongoose.model.MessageModel || mongoose.model("MessageModel", messageSchema);

export default MessageModel;
