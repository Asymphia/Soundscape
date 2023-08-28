const mg = require('mailgun-js')
const mongoose = require('mongoose')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const nodemailer = require('nodemailer')

const mailgun = () => mg({
    apiKey: process.env.MAIL_API_KEY,
    domain: process.env.MAIL_DOMAIN
})

const sendEmail = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, process.env.SECRET)
    const id = decodedToken._id

    const message = req.query.message

    const userId = new mongoose.Types.ObjectId(id)
    const user = await User.findById(userId)
    const userEmail = user.email

    const data = {
        from: userEmail,
        to: process.env.EMAIL,
        subject: 'Soundscape Question',
        html: `
            <html>
              <head>
                <style>
                  * {
                    margin: 0;
                    padding: 0;
                  }
                  body {
                    font-family: Arial, sans-serif;
                  }
                  h1, h3 {
                    text-align: center;
                  }
                  h1{
                    margin-bottom: 10px;
                  }
                  h3{
                    margin-bottom: 30px;
                    color: #333;
                  }
                </style>
              </head>
              <body>
                <h1>Soundscape</h1>
                <h3>from: <i>${userEmail}</i></h3>
                <p>${message}</p>
              </body>
            </html>
      `
    }

    mailgun().messages().send(data, (err, body) => {
        if(err){
            res.status(500).json({ error: err.message })
        } else{
            res.status(200).json(body)
        }
    })
}

const sendResetCode = async (req, res) => {
    try {
        const userEmail = req.body.email

        const user = await User.findOne({ email: userEmail })
        if(!user){
            return res.status(404).json({ error: 'User not found.' })
        }

        const resetCode = crypto.randomBytes(6).toString('hex')
        const resetCodeExpiration = Date.now() + 60 * 60 * 1000

        user.resetCode = resetCode
        user.resetCodeExpiration = resetCodeExpiration
        await user.save()

        const transporter = nodemailer.createTransport({
            service: 'hotmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWD
            },
            tls: {
                rejectUnauthorized: false // Tylko na potrzeby testowania
            }
        })

        const mailOptions = {
            from: process.env.EMAIL,
            to: userEmail,
            subject: 'Reset Code - Soundscape',
            text: `Your reset code: ${resetCode}`
        }

        const emailResult = await transporter.sendMail(mailOptions)

        res.status(200).json(emailResult)

    } catch (err){
        res.status(500).json({ error: err.message })
    }
}

module.exports = { sendEmail, sendResetCode }