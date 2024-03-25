import createHttpError from "http-errors";
import logger from "../configs/logger.config.js";
import {
  doesConversationExist,
  createConversation,
  populateConversation,
  getUserConversations,
} from "../services/conversation.service.js";
import { findUser } from "../services/user.service.js";

export const createOpenConversation = async (req, res, next) => {
  try {
    const senderId = req.user.userId;
    const { receiver_id } = req.body;
    //check if receiver_id is provided
    if (!receiver_id) {
      logger.error(
        "Please provide the user id you wanna start a coversation with!"
      );
      throw createHttpError.BadRequest("Something went wrong");
    }
    //check if chat exists
    const existedConversation = await doesConversationExist(
      senderId,
      receiver_id
    );
    if (existedConversation) {
      res.json(existedConversation);
    } else {
      // let receiver_user = await findUser(receiver_id);
      let convoData = {
        name: receiver_user.name,
        picture: receiver_user.picture,
        isGroup: false,
        users: [senderId, receiver_id],
      };
      const newConvo = await createConversation(convoData);
      const populatedConvo = await populateConversation(
        newConvo._id,
        "users",
        "-password"
      );
      res.status(200).json(populatedConvo);
    }
  } catch (error) {
    next(error);
  }
};

export const getConversations = async (req, res, next) => {
  try {
    const user_id = req.user.userId;
    const conversations = await getUserConversations(user_id);
    res.status(200).json(conversations);
  } catch (error) {
    next(error);
  }
};
