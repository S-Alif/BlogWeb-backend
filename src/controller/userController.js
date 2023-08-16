// get packages
const jwt = require('jsonwebtoken')

// get models
const userModel = require('../models/userModel')
const otpModel = require("../models/otpModel")

// utitlity
const mailSender = require('../utility/sendMail')

// email markups
const mailMarkup = require('./markups')
const commentModel = require('../models/commentModel')


// registration
exports.registration = async (req, res) => {
  try {    
    let createUser = await userModel.create(req.body)

    res.status(200).json({
      status: 1,
      data: createUser
    })

  } catch (error) {
    res.status(200).json({
      status: 0,
      data: error
    })
  }
}

// login
exports.login = async (req, res) => {
  try {
    let user_login = await userModel.find(req.body).count('total')
    let id = await userModel.find(req.body).select("_id")

    // issuing token
    if (user_login == 1) {
      let payload = {
        exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60),
        email: req.body['email']
      }

      // sign the token
      let token = jwt.sign(payload, `${process.env.secretKey}`, { algorithm: 'HS256' });
      res.status(200).json({
        status: 1,
        data: token,
        id: ""+id[0]['_id'].toString()
      })
    }
    else {
      res.status(200).json({
        status: 0,
        data: user_login
      })
    }
  }
  catch (error) {
    res.status(200).json({
      status: 0,
      data: error
    })
  }
}

// send otp
exports.send_otp = async (req, res) => {
  try {
    let email = req.params.email
    let otpCode = Math.floor(100000 + Math.random() * 900000) //creating otp

    // inserting otp to database
    await otpModel.create({ email: email, otp: otpCode })
    let send_email = await mailSender(email, mailMarkup.otp_markup(otpCode), "BlogWeb account verification", "BlogWeb Verification Code")

    res.status(200).json({
      status: 1,
      data: send_email, email
    })

  } catch (error) {
    res.status(200).json({
      status: 0,
      data: error
    })
  }
}

// verifying otp
exports.verify_otp = async (req, res) => {
  try {
    let email = req.params.email
    let otp = req.params.otp

    // finding the otp
    let verify = await otpModel.find({ email: email, otp: otp, status: 0 }).count('total')
    let notMatched = await otpModel.find({ email: email, otp: otp, status: 1 })

    if (verify == 1) {
      await otpModel.updateOne({ email: email, otp: otp, status: 0 }, { status: 1 })  //updating otp status
      res.status(200).json({
        status: 1,
        data: "Verification success"
      })
    }
    else if (notMatched[0].otp != otp) {
      res.status(200).json({
        status: 0,
        data: "OTP do not match"
      })
    }
    else {
      res.status(200).json({
        status: 0,
        data: "OTP is already used"
      })
    }
  } catch (error) {
    res.status(200).json({
      status: 0,
      data: error
    })
  }
}

// update user data
exports.updateUser = async (req, res) => {
  try {
    let id = req.params.id
    let update = await userModel.updateOne({_id: id},req.body)
    let commentUpdate = await commentModel.updateMany({ "commentAuthor.id" : id }, {
      commentAuthor:{
        id: id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        pfp: req.body.pfp
      }
    })

    res.status(200).json({
      status: 1,
      data: update
    })

  } catch (error) {
    res.status(200).json({
      status: 0,
      data: error
    })
  }
}