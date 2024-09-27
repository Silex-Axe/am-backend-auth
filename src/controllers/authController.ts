import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';
//import speakeasy from 'speakeasy'; // 2FA 

export const signup = async (req: Request, res: Response) => {
  const { username, password } = req.body;
console.log(req.body)
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, password: hashedPassword });
    res.json({ message: 'User created', userId: newUser.id });
  } catch (error) {
    console.log(error)

    res.status(500).json({ error: 'Error creating user' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};

/** TODO - Review and rewritte asa necessary
const speakeasy = require('speakeasy');  // For 2FA

// Enable 2FA
export const enable2FA = async (req: Request, res: Response) => {
  const { userId } = req.user;  // Assume user is authenticated
  const secret = speakeasy.generateSecret();

  try {
    await User.update({ secret2FA: secret.base32, is2FAEnabled: true }, { where: { id: userId } });
    res.json({ qrCodeUrl: `otpauth://totp/${process.env.APP_NAME}:${userId}?secret=${secret.base32}` });
  } catch (error) {
    res.status(500).json({ error: 'Failed to enable 2FA' });
  }
};

// Verify 2FA
export const verify2FA = async (req: Request, res: Response) => {
  const { userId } = req.user;
  const { token } = req.body;

  const user = await User.findByPk(userId);
  const verified = speakeasy.totp.verify({ secret: user.secret2FA, encoding: 'base32', token });

  if (verified) {
    res.json({ message: '2FA verified' });
  } else {
    res.status(401).json({ error: 'Invalid token' });
  }
};
 */