const express = require('express')
const router = express.Router()
const UserController = require('./User.Controller')

router.post('/list', UserController.list)

router.get('/:id', UserController.findById)

router.put('/:id', UserController.update)

router.delete('/:id', UserController.delete)

module.exports = router
