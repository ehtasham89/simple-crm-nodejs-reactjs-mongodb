const createError = require('http-errors')
const redisClient = require('../helpers/init_redis')

const User = require('../User/User.model')
const { authSchema, userSchema } = require('../helpers/validation_schema')
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  getPayload
} = require('../helpers/jwt_helper')
const client = require('../helpers/init_redis')

module.exports = {
  loggedUser: async (req, res, next) => {
    try {
      const userId = await getPayload(req, next);
      const data = await User.findById(userId)
      if (!data._id)
        throw createError.NotFound(`User data not found!`)

      res.send({ data })
    } catch (error) {
      console.error(error)
      next(error)
    }
  },

  login: async (req, res, next) => {
    try {
      const result = await authSchema.validateAsync(req.body)
      const user = await User.findOne({ email: result.email }).select('+password').exec()
      if (!user) throw createError.NotFound('User not registered')

      const isMatch = await user.isValidPassword(result.password)
      if (!isMatch)
        throw createError.Unauthorized('email/password not valid')

      const accessToken = await signAccessToken(user.id)
      const refreshToken = await signRefreshToken(user.id)

      redisClient.SET(`auth_type_${user._id}`, user.role, 'EX', 60 * 60)

      res.send({ accessToken, refreshToken })
    } catch (error) {
      console.error(error)

      if (error.isJoi === true)
        return next(createError.BadRequest('Invalid email/Password'))
      
        next(error)
    }
  },
  registerAdmin: async (req, res, next) => {
    try {
      const result = await userSchema.validateAsync({...req.body, role: "supper_admin"})
      const doesExist = await User.findOne({ email: result.email })

      if (doesExist)
        throw createError.Conflict(`${result.email} is already been registered`)

      const user = new User(result)
      const savedUser = await user.save()

      res.send({ data:savedUser, message: "User data saved successfully." })
    } catch (error) {
      console.error(error);
      next(error)
    }
  },

  refreshToken: async (req, res, next) => {
    try {
      const { refreshToken } = req.body
      if (!refreshToken) throw createError.BadRequest()
      const userId = await verifyRefreshToken(refreshToken)

      const accessToken = await signAccessToken(userId)
      const refToken = await signRefreshToken(userId)
      res.send({ accessToken: accessToken, refreshToken: refToken })
    } catch (error) {
      console.error(error);
      next(error)
    }
  },

  logout: async (req, res, next) => {
    try {
      const { refreshToken } = req.body
      if (!refreshToken) throw createError.BadRequest()
      const userId = await verifyRefreshToken(refreshToken)
      client.DEL(userId, (err, val) => {
        if (err) {
          console.log(err.message)
          throw createError.InternalServerError()
        }
        console.log(val)
        res.sendStatus(204)
      })
    } catch (error) {
      console.error(error);
      next(error)
    }
  },
}
