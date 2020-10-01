const express = require('express')
const router = express.Router()
const UserController = require('./User.Controller')

router.get('/list', UserController.list)

router.post('/create', UserController.create)

router.get('/:id', UserController.findById)

router.put('/:id', UserController.update)

router.delete('/:id', UserController.delete)

module.exports = router
