const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'sierra.lind85@ethereal.email',
        pass: 'AZk4mHpYC4mz7ZRmQU'
    }
});

module.exports = {
    sendVerficationEmail: async(senderAddress,link) => {
        let error = false;
        try {
            // send mail with defined transport object
            await transporter.sendMail({
            from: '"hariharan nks 👻" <nkshariharan17@gmail.com>', // sender address
            to: senderAddress, // list of receivers
            subject: "From hariharan nks, To Verify email", // Subject line
            html: `Click link to verify email <a href="${link}"> here</a>`, // html body
        });
        } catch (error) {
            error = true;
        }
        return error  
    },
    sendFogotPasswordEmail: async(senderAddress,link) => {
        let error = false;
        try {
            // send mail with defined transport object
            await transporter.sendMail({
            from: '"hariharan nks 👻" <nkshariharan17@gmail.com>', // sender address
            to: senderAddress, // list of receivers
            subject: "From hariharan nks, Reset Password", // Subject line
            html: `Reset Password by Clicking <a href="${link}"> here</a>`, // html body
        });
        } catch (error) {
            error = true;
        }
        return error
    }
}

