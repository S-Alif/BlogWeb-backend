// get packages
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  let token = req.headers['token']
  jwt.verify(token, `${process.env.secretKey}`, (error, decoded) => {

    if (error) {
      res.status(401).json({
        code: 401,
        status: 0,
        data: "Unauthorized"
      })
    }
    else {
      let email = decoded['email']
      req.headers.email = email   // passing the email into header
      next()
    }
  })
}