import { response } from 'express'
import nodeMailer from 'nodemailer'

export const sendMail = async (userEmail, emailSubject, emailBody) => {
    try {
        const transpoter = nodeMailer.createTransport({
            service: "Gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.AUTH_EMAIL,
                pass: process.env.AUTH_PASS
            },
    });
    
    const mailOption = {
        from: process.env.AUTH_EMAIL,
        to: userEmail,
        subject: emailSubject,
        text: emailBody
    }

    await transpoter.sendMail(mailOption);
    console.log("Enail sent");

    } catch (error) {
        console.error(error.message);
    }
};