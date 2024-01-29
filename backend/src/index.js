import app from "./app.js";
import logger from "./configs/logger.config.js";

//env variables
const PORT = process.env.PORT || 8000;

//log the ENV
console.log(process.env.NODE_ENV);

app.listen(PORT, () => {
  logger.info(`App is litening at port : ${PORT}...`);
});
