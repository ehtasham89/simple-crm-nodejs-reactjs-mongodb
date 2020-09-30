const express = require('express')
const router = express.Router()
const LeadsController = require('./Leads.Controller')

router.get('/list', LeadsController.list)

router.post('/create', LeadsController.create)

router.put('/:id', LeadsController.update)

router.delete('/:id', LeadsController.delete)

module.exports = router
