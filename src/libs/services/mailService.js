import nodemailer from "nodemailer"

export async function sendEmail(subject,toEmail,verifytext){
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS
        }
    })

    const mailOptions={
        from : process.env.EMAIL,
        to: toEmail,
        subject: subject,
        text: verifytext,

        html:`<a href="http://localhost:3000/verification?email=${toEmail}">${verifytext}</a>`
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email: " + error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
}