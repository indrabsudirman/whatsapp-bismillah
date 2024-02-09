import { mongoose } from "mongoose";
const { ObjectId } = mongoose.Schema.Types;
const conversationSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Conversation is required."],
      trim: true,
    },
    isGroup: {
      type: Boolean,
      required: true,
      default: false,
    },
    users: [
      {
        type: ObjectId,
        ref: "UserModel",
      },
    ],
    latestMessage: {
      type: ObjectId,
      ref: "MessageModel",
    },
    admin: {
      type: ObjectId,
      ref: "UserModel",
    },
  },
  {
    collection: "conversations",
    // timestamps: true,
    timestamps: {
      currentTime: () => DateTime.local().setZone("Asia/Jakarta"),
    },
  }
);

const ConversationModel =
  mongoose.model.ConversationModel ||
  mongoose.model("ConversationModel", conversationSchema);
export default ConversationModel;
