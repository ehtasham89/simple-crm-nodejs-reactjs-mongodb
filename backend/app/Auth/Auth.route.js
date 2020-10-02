const express = require('express')
const router = express.Router()
const AuthController = require('./Auth.Controller')

router.get('/me', AuthController.loggedUser)

router.post('/register', AuthController.create)

router.post('/login', AuthController.login)

router.post('/refresh-token', AuthController.refreshToken)

router.delete('/logout', AuthController.logout)

module.exports = router
