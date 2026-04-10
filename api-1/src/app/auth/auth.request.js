const Joi=require('joi');
//rules for data validation
const registerDTO = Joi.object({
  name:Joi.string().min(3).max(30).required(),
  email:Joi.string().email().required(),
  password:Joi.string().required(),
  confirmPassword:Joi.ref('password'),
  role:Joi.string().allow('seller','customer').default('customer')
  
},
)

const loginDTO=Joi.object({
email:Joi.string().email().required(),
 password:Joi.string().required()
})

const updateMyProfileDTO=Joi.object({
 name:Joi.string().min(3).max(30).required(),
 address: Joi.string().min(3).max(250).required(),
  gender:Joi.string().allow('male','female','other').required(),
  dob:Joi.date().less('now').required(),
  image:Joi.string().allow(null,'').optional().default(null)
})

module.exports={
  registerDTO,
  loginDTO,
  updateMyProfileDTO
}