import jwt from 'jsonwebtoken';
import { User } from '../types';
import { config } from '../config';
import nodemailer from 'nodemailer';

export const __GENERATE_TOKEN = (user: User) => {
    return jwt.sign({user}, config.auth.jwtSecret, { expiresIn: '4h' });
}

export async function __sendEmail(email: string, html: string, subject: string) {
    // let testAccount = await nodemailer.createTestAccount();

    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "innovatechlabs7@gmail.com", 
          pass: "wufs etjq tgju eutm", 
        },
      });
    
      // send mail with defined transport object
      const info = await transporter.sendMail({
        from: {
          name: "CREATIVE STUDIO",
          address: "innovatechlabs7@gmail.com"
        },
        to: email, // list of receivers
        subject, // Subject line
        html, // html body
      });
    
      console.log("Message sent: %s", info.response);
    } catch (error) {
      console.log("error >>>",error)
    }
  }

  // 9tQS@lk7ZNrqb

