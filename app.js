// packages
const express = require('express');
const hpp = require('hpp');
const helmet = require('helmet');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser')

// app
const app = express()

// router
const router = require('./src/routes/routes')

// security
app.use(cors())
app.use(hpp())
app.use(helmet())
app.use(mongoSanitize())
app.use(express.json({ limit: '5mb' }))
app.use(express.urlencoded({ limit: '5mb' }))

// router
app.use('/blog', router)

// dotenv
dotenv.config()

// rate limiting
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 300 });
app.use(limiter);


// database
let option = { user: `${process.env.user}`, pass: `${process.env.pass}`, autoIndex: true }
mongoose.connect(`${process.env.db}${process.env.dbName}`, option)
  .then(res => console.log("database connection success"))
  .catch(error => console.log(error))


module.exports = app