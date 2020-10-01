const express = require('express')
const morgan = require('morgan')
const cors = require('cors');

require('dotenv').config()

const initApp = require('./app')

const app = express()

app.use(morgan(process.env.APP_ENV || 'dev'))
console.log("process.env.APP_ENV", process.env.APP_ENV);
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

process.env.APP_ENV === 'dev' && app.use(cors()); //for unblocked cross origin resquest

const PORT = process.env.PORT || 3000

initApp(app, PORT);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
