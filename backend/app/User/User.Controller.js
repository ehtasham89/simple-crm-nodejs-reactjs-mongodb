const createError = require('http-errors')
const User = require('./User.model')
const { userSchema } = require('../helpers/validation_schema')
const { getPayload } = require('../helpers/jwt_helper')

module.exports = {
  findById: async (req, res, next) => {
    try {
      const data = await User.findById(req.params.id)

      if (!data.length)
        throw createError.NotFound(`User data not found!`)

      res.send({ data })
    } catch (error) {
      console.error(error);
      next(error)
    }
  },
  
  list: async (req, res, next) => {
    try {
      const data = await User.find({role: "staff"})
      if (!data.length)
        throw createError.NotFound(`User list is empty.`)

      res.send({ data })
    } catch (error) {
      console.error(error);
      next(error)
    }
  },

  update: async (req, res, next) => {
    try {
      const { name } = req.body
      
      if (!name) throw createError.BadRequest("name are required")

      const user = await User.findById(id)
      if (!user) throw createError.NotFound('User not found!')

      user.name = name;
      const updateUser = new User(user);
      const savedUser = await updateUser.updateOne();

      res.send({ data: savedUser, message: "user updated successfully"})
    } catch (error) {
      console.error(error);
      next(error)
    }
  },

  delete: async (req, res, next) => {
    try {
      const id = req.params.id
      const user = await User.findById(id)
      if (!user) throw createError.NotFound('User not found!')

      const userAction = new User(user);
      const delUser = await userAction.deleteOne();

      res.send({ data: delUser, message: "user deleted successfully"})
    } catch (error) {
      console.error(error);
      next(error)
    }
  },
}
