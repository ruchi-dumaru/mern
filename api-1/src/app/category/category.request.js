const Joi=require("joi")
const { Status } = require("../../config/constant.config")

const CategoryDataDTO=Joi.object({
 name:Joi.string().min(2).max(100).required(),
 isFeatured:Joi.boolean().optional().default(false),
 parentId:Joi.string().allow(null,'').optional().default(null),
 brands:Joi.array().items(
  Joi.string().allow(null,'').optional().default(null)
 ).allow(null,'').optional().default(null),
 status:Joi.string().regex(/^(active|inactive)$/).default(Status.INACTIVE),
 icon:Joi.string().allow(null,'').optional().default(null)
 
})

module.exports={
  CategoryDataDTO
}