require('dotenv').config();

const bodyParser = require("body-parser");
const express = require('express');
const app = express();
const initApp = require('./app');

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT || 4000; //http port, can be changed from .env file

initApp(app, port); //bootstrap application

app.listen(port)