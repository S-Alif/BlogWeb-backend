// get packages
const nodemailer = require('nodemailer')

const sendEmail = async (mailto, mailText, mailSubject) => {
  try {
    let transporter = nodemailer.createTransport({
      host: 'smtp-relay.brevo.com',
      port: 587,
      secure: false,
      auth: {
        user: `${process.env.mailUrl}`,
        pass: `${process.env.mailPass}`
      },
      tls: {
        rejectUnauthorized: false
      }
    })

    let mailOption = {
      from: `BlogWeb${process.env.mail}`,
      to: mailto,
      subject: mailSubject,
      text: mailText
    }

    return await transporter.sendMail(mailOption)
  } catch (error) {
    console.log(error)
  }
}

module.exports = sendEmail