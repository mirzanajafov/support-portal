const sgMail = require('@sendgrid/mail')

const API_KEY = process.env.sendGrid_API_KEY

sgMail.setApiKey(API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'mirze297n@gmail.com',
        subject: 'Thank for joining in!',
        text: `Welcome to the app ${name}`
    })
}

module.exports = {
    sendWelcomeEmail,

}