import { User } from "@/models/userModel";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import base64url from "base64url";

interface Params {
  email: string;
  emailType: string;
  userID: string;
}

export const sendEmail = async ({ email, emailType, userID }: Params) => {
  try {
    // Generate a hashed token
    const hashedToken = await bcrypt.hash(userID.toString(), 10);

    // Encode the token using base64url to make it URL-safe
    const encodedToken = base64url.encode(hashedToken);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userID, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 1800000, // 30 minutes expiry
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userID, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000, // 1 hour expiry
      });
    }

    // Using MailTrap as mail client
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    const mailOptions = {
      from: '"NextAuth App" <nextjs@auth.email>',
      to: email,
      subject:
        emailType === "VERIFY"
          ? "Email Verification for NextAuth"
          : "Password Reset for NextAuth",
      html:
        emailType === "VERIFY"
          ? `<b>Please verify your email by clicking the link below:</b><br><a href="${process.env.DOMAIN}/verify/${encodedToken}">Verify Email</a> <br> OR <br> Copy paste the following link into your preferred browser: "${process.env.DOMAIN}/verify/${encodedToken}" <br> This token is valid only for 30 mins.`
          : `<b>Please reset your password by clicking the link below:</b><br><a href="${process.env.DOMAIN}/reset-password/${encodedToken}">Reset Password</a> <br> OR <br> Copy paste the following link into your preferred browser: "${process.env.DOMAIN}/reset-password/${encodedToken}" <br> This token is valid only for an hour.`,
    };

    const info = await transporter.sendMail(mailOptions);

    return info;
  } catch (error: any) {
    console.error(`Error sending email: ${error.message}`);
    throw new Error(error.message);
  }
};
