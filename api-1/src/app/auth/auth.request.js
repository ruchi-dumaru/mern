const Joi=require('joi');
const roleRegex=/^(seller|customer)$/;
const passwordRegex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[\W_]).{8,25}$/;

//rules for data validation
const registerDTO = Joi.object({
  name:Joi.string().min(3).max(30).required(),
  email:Joi.string().email().required(),
  password:Joi.string().regex(passwordRegex).required().messages({
    "string.pattern.base":"Password must be strong"
  }),
  confirmPassword:Joi.ref('password'),
  role:Joi.string().regex(roleRegex).default('customer').messages({
    "string.pattern.base":"Role must be either 'seller'or'customer'"
  }),
   image:Joi.string().allow(null,'').optional().default(null)
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