const mongoose = require('mongoose')

let opt_schema = mongoose.Schema({
  email: { type: String },
  otp: { type: Number },
  status: { type: Number, default: 0 }
}, { timestamps: true, versionKey: false })

module.exports = mongoose.model('otp', opt_schema)