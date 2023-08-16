// otp markup
exports.otp_markup = (otpCode) => {
  let markup = `
  <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">BlogWeb</a>
    </div>
    <p style="font-size:1.1em">Hi,</p>
    <p>Thank you for choosing BlogWeb. Use the following OTP to complete your Sign Up procedures</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otpCode}</h2>
    <p style="font-size:0.9em;">Regards,<br />BlogWeb team</p>
    <hr style="border:none;border-top:1px solid #eee" />

  </div>
</div>
  `
  return markup
}