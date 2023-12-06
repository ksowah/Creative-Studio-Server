import jwt from 'jsonwebtoken';
import { User } from '../types';
import { config } from '../config';
import nodemailer from 'nodemailer';

export const __GENERATE_TOKEN = (user: User) => {
    return jwt.sign({user}, config.auth.jwtSecret, { expiresIn: '4h' });
}

export async function __sendEmail(email: string, html: string, subject: string) {
    // let testAccount = await nodemailer.createTestAccount();
  
    const transporter = nodemailer.createTransport({
      service: "hotmail",
      // host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "no_reply_mapCut@outlook.com", 
        pass: "123@freshmapCut", 
      },
    });
  
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: `"CREATIVE STUDIO" <${"no_reply_mapCut@outlook.com"}>`, // sender address
      to: email, // list of receivers
      subject, // Subject line
      html, // html body
    });
  
    console.log("Message sent: %s", info.response);
  }

