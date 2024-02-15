import { Request, Response } from 'express';
import UserModel from '../models/Users';
import bcrypt from 'bcrypt';
import CustomError from '../errors';
import { StatusCodes } from 'http-status-codes';
import nodemailer from 'nodemailer';
import { UserRequest } from '../middlewares/authentication';
import Randomstring from 'randomstring';

const sendResetPasswordLink = async (
  name: string,
  email: string,
  token: string
) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.net',
      port: 465,
      secure: true,
      requireTLS: true,
      auth: {
        user: process.env.USERNAME,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.USERNAME,
      to: email,
      subject: 'Reset Password',
      html: `<h1> Hi ${name}</h1><br><h3> Please click on the link to reset your password</h3><br><a href='http://localhost:3000/api/v1/pass/reset-password?token=${token}'>Reset Password</a>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log(`Email Sent: ${info.response}`);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const forgetPassword = async (req: UserRequest, res: Response) => {
  try {
    const currentUser = req.user;
    if (!currentUser) {
      throw new CustomError.BadRequestError('User does not exists');
    }
    const existingUser = await UserModel.findOne({ email: currentUser.email });
    if (!existingUser) {
      throw new CustomError.BadRequestError('User does not Found');
    } else {
      const randomToken = Randomstring.generate();
      await UserModel.updateOne(
        { email: currentUser.email },
        { $set: { token: randomToken } }
      );
      await sendResetPasswordLink(
        existingUser.firstname,
        existingUser.email,
        randomToken
      );
      res
        .status(StatusCodes.OK)
        .json({ msg: 'Reset Password has been sent to your email' });
    }
  } catch (error) {
    console.error(error);
  }
};

const showResetPassword = async (req: Request, res: Response) => {
  try {
    const userDetails = await UserModel.findOne({ token: req.query.token });
    res.render('reset-password', { userDetails });
  } catch (error) {
    res.render('error');
  }
};
const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email, password, confirmPassword } = req.body;
    if (!email && !password && !confirmPassword) {
      throw new CustomError.BadRequestError('Information Missing');
    }

    if (password !== confirmPassword) {
      throw new CustomError.BadRequestError('Passwords Do not Match');
    }
    const ResetUser = await UserModel.findOne({ email });
    if (!ResetUser) {
      throw new CustomError.NotFoundError('User Do not exist with this email');
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      await UserModel.updateOne(
        { email: email },
        { $set: { password: hashedPassword } }
      );
      return res.redirect('/api/v1/pass/success');
    }
  } catch (error) {
    console.log(error);
  }
};
const showSuccessPage = async (req: Request, res: Response) => {
  res.render('success');
};
export { forgetPassword, resetPassword, showResetPassword, showSuccessPage };
