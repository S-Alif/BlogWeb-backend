const useModel = require('../models/userModel')

module.exports = async (req, res, next) => {
  let mail = req.headers['email']
  let role = await useModel.findOne({email: mail}).select("role _id")

  req.headers.role = role.role
  req.headers.id = role['_id'].toString()
  next()
}