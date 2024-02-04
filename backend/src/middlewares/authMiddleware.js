import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import logger from "../configs/logger.config.js";

export default async function (req, res, next) {
  const { REFRESH_TOKEN_SECRET, ACCESS_TOKEN_SECRET } = process.env;
  if (!req.headers["authorization"])
    return next(createHttpError.Unauthorized());
  const bearerToken = req.headers["authorization"];
  const token = bearerToken.split(" ")[1];
  jwt.verify(token, ACCESS_TOKEN_SECRET, (error, payload) => {
    if (error) {
      logger.error(error);
      return next(createHttpError.Unauthorized());
    }
    req.user = payload;
    next();
  });
}
