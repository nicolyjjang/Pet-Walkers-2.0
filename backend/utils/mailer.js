const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "5c8f804ec6ffa0",
      pass: "c78d2c7ef75019"
    }
  });

const sendMail = async (to, subject, text) => {
    try {
        const info = await transporter.sendMail({
            from: '"Petwalekrs"<no-reply@petwalekrs.com>',
            to,
            subject,
            text
        });
        console.log('Email enviado: %s', info.messageId);
    } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
    }
};

module.exports = sendMail;
