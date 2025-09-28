import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.RECIPIENT_EMAIL_ADDRESS,
    pass: process.env.RECIPIENT_EMAIL_PASSWORD,
  },
});



export const sendSignupOTPEmail = async (emailID: string, otp: number) => {
    const mailOptions: any = {
      from: process.env.RECIPIENT_EMAIL_ADDRESS,
      to: emailID,
      subject: "Your OTP Code for Signup Verification",
      html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
            <h2 style="color: #4CAF50;">Welcome to LinkUp!</h2>
            <p>Hello</p>
            <p>Thank you for signing up. Please use the following OTP to verify your email address:</p>
            <div style="text-align: center; margin: 30px 0;">
              <span style="font-size: 28px; letter-spacing: 4px; font-weight: bold; background: #f4f4f4; padding: 10px 20px; border-radius: 5px; display: inline-block;">${otp}</span>
            </div>
            <p>This OTP is valid for the next 5 minutes. Please do not share this code with anyone.</p>
            <p>If you did not request this, please ignore this email.</p>
            <br/>
            <p>Best regards,<br/>LinkUp Team</p>
          </div>`,
    };
  
    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error) => {
        if (error) {
          reject(new Error("Error while sending the email to user"));
        } else {
          resolve("Email send successfully");
        }
      });
    });
  };
  