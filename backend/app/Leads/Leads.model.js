const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const LeadsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true
  },
  user_id: {
    type: String,
    required: true,
  }
})

const Leads = mongoose.model('leads', LeadsSchema)
module.exports = Leads
