const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'sierra.lind85@ethereal.email',
        pass: 'AZk4mHpYC4mz7ZRmQU'
    }
});

module.exports = async(senderAddress,link) => {
    let error = false;
    try {
        // send mail with defined transport object
        await transporter.sendMail({
        from: '"hariharan nks 👻" <nkshariharan17@gmail.com>', // sender address
        to: senderAddress, // list of receivers
        subject: "from hariharan nks, To Verify email", // Subject line
        html: `click link to verify email<a href="${link}"> here</a>`, // html body
    });
    } catch (error) {
        error = true;
    }
    return error
    
}

