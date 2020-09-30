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

const leadsSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().lowercase().required(),
  phone: Joi.string().min(9).required(),
  user_id: Joi.string().required()
})

const leadsUpdateSchema = Joi.object({
  name: Joi.string().min(3),
  email: Joi.string().email().lowercase(),
  phone: Joi.string().min(9),
  user_id: Joi.string()
})

module.exports = {
  authSchema,
  userSchema,
  leadsSchema,
  leadsUpdateSchema
}
