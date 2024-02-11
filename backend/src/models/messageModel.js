import mongoose from "mongoose";
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
    timestamps: {
      currentTime: () => DateTime.local().setZone("Asia/Jakarta"),
    },
  }
);

const MessageModel =
  mongoose.model.MessageModel || mongoose.model("MessageModel", messageSchema);

export default MessageModel;
