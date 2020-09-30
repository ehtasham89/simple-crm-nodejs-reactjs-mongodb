const createError = require('http-errors')
const User = require('./User.model')
const { authSchema } = require('../helpers/validation_schema')

module.exports = {
  list: async (req, res, next) => {
    try {
      const data = await User.find({})
      if (!data.length)
        throw createError.NotFound(`User list is empty.`)

      res.send({ data })
    } catch (error) {
      next(error)
    }
  },

  create: async (req, res, next) => {
    try {
      const result = await authSchema.validateAsync(req.body)
      const user = await User.findOne({ email: result.email })
      if (!user) throw createError.NotFound('User not registered')

      const isMatch = await user.isValidPassword(result.password)
      if (!isMatch)
        throw createError.Unauthorized('Username/password not valid')

      const accessToken = await signAccessToken(user.id)
      const refreshToken = await signRefreshToken(user.id)

      res.send({ accessToken, refreshToken })
    } catch (error) {
      if (error.isJoi === true)
        return next(createError.BadRequest('Invalid Username/Password'))
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
      next(error)
    }
  },

  delete: async (req, res, next) => {
    try {
      const id = req.params.id
      const user = await User.findById(id)
      if (!user) throw createError.NotFound('User not found!')

      const _user = new User(user);
      const delUser = await _user.deleteOne();

      res.send({ data: delUser, message: "user deleted successfully"})
    } catch (error) {
      next(error)
    }
  },
}
