const express = require('express')
const morgan = require('morgan')

require('dotenv').config()

const initApp = require('./app')

const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT || 3000

initApp(app, PORT);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
