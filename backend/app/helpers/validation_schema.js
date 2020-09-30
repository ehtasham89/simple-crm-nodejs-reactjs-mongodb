const Joi = require('joi')

const authSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(5).required()
})

const userSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(5).required(),
  role: Joi.string().valid('supper_admin', 'staff'),
})

module.exports = {
  authSchema,
}
