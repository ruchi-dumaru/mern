const Joi = require("joi");
const bodyValidator = require("../../middleware/validator.middleware");
const chatController = require("./chat.controller");
const auth = require("../../middleware/auth.middleware");

const chatRouter = require("express").Router();

//chat message send

const ChatMessageDTO = Joi.object({
  receiver: Joi.string().required(),
  message: Joi.string().min(1).max(2000).required(),
});
chatRouter.post(
  "/",
  auth(),
  bodyValidator(ChatMessageDTO),
  chatController.addChat,
);
chatRouter.get("/:receiver",auth(),chatController.getChatList)


module.exports = chatRouter;

// "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2YTZkNDNjYjIxZDhiYjVjM2FiYzgyNDMiLCJ0eXAiOiJCZWFyZXIiLCJpYXQiOjE3ODU1NjQ1NjgsImV4cCI6MTc4NTY1MDk2OH0.XJ0kJK3niO9D6Qa4uebf_Env3ge6qOWB06m2ELN-dQM",
