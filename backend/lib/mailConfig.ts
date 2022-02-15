import "dotenv/config";
import { createTransport, getTestMessageUrl } from "nodemailer";

const transporter = createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function generateEmailTemplate(text: string): string {
  return `
        <div style="
            border: 1px solid black;
            padding:20px;
            font-family:sans-serif;
            line-height:2;
            font-size:20px
        ">
        <h2>Reset Password || SickFits</h2>
        <p>${text}</p>
        <h6>from SickFits</h6>
        </div>
    
    `;
}

export async function sendPasswordResetEmail(token: string, to: string) {
  const email = await transporter.sendMail({
    to: to,
    from: "test@example.com",
    subject: "Password reset link for SickFits",
    html: generateEmailTemplate(`
        Please reset your password using the following link.
        <a href="${process.env.FRONTEND_URL}/resetPassword?token=${token}">Click here to reset your password.</a>
        `),
  });

  if (process.env.MAIL_USER.includes("ethereal.email")) {
    console.log(
      `Email has been sent. Preview it here ${getTestMessageUrl(email)}`
    );
  }
}
