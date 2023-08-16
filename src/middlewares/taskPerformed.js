const blogModel = require('../models/blogModel')

module.exports = async (req, res, next) => {
  let role = req.headers.role
  let mail = req.headers.email
  let id = req.params.id
  let author = await blogModel.findOne({ _id: id })
  console.log(author, id)

  if(role == "admin" || author['_id'].toString() == mail){
    next()
  }else{
    res.status(200).json({
      status: 0,
      data: "Unauthorized"
    })
  }
}