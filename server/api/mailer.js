const nodemailer = require('nodemailer')
const router = require('express').Router()
module.exports = router

router.post('/send', (req, res, next) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'gshoepurr@gmail.com',
      pass: process.env.MAILER_PW
    }
  })
  const mailOptions = {
    from: 'gshoepurr.gmail.com',
    to: `${req.body.toEmail}`,
    subject: `${req.body.name}`,
    text: `${req.body.message}`,
    replyTo: 'gshoepurr.gmail.com'
  }
  transporter.sendMail(mailOptions, (err, res) => {
    if (err) console.error('There was an error ', err)
    else console.log('here is the res ', res)
  })
})
