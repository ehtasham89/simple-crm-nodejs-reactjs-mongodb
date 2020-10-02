const createError = require('http-errors')
const User = require('./User.model')
const { authSchema } = require('../helpers/validation_schema')

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

  create: async (req, res, next) => {
    try {
      const result = await userSchema.validateAsync({...req.body, role: "staff"})
      const doesExist = await User.findOne({ email: result.email })

      if (doesExist)
        throw createError.Conflict(`${result.email} is already been registered`)

      const user = new User(result)
      const savedUser = await user.save()

      res.send({ data:savedUser, message: "User data saved successfully." })
    } catch (error) {
      console.error(error);

      if (error.isJoi === true)
        return next(createError.BadRequest('Invalid user data'))
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
