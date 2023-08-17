// checks if the account is verified before login
const useModel = require('../models/userModel')

module.exports = async (req, res, next) => {
  let email = req.body.email
  let result = await useModel.find({email : email}).count('total')
  
  if(result == 1){
    let verified = await useModel.findOne({ email: email }).select('verified')
    if(verified.verified == 1){
      next()
    }
    else{
      res.status(200).json({
        status: 101,
        data: "Your account is not verified"
      })
    }
  }
  else{
    res.status(200).json({
      status: 10,
      data: "There is no user registered with this email"
    })
  }
}