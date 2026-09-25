const Joi = require("joi");
const { Status } = require("../../config/constant.config");

const BannerDataDTO = Joi.object({
  title: Joi.string().trim().min(3).max(150).required(),
  link: Joi.string().trim().uri().required(),
  status: Joi.string()
    .valid(Status.ACTIVE, Status.INACTIVE)
    .default(Status.INACTIVE),
  image: Joi.any().optional(),
});

module.exports = { BannerDataDTO };
