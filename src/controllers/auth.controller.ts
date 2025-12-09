import { Request, Response } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export const login = (req: Request, res: Response) => {
    const { password } = req.body;

    console.log("password : ", password);
    console.log("process.env.ADMIN_PASSWORD : ", process.env.ADMIN_PASSWORD);

    if (password === process.env.ADMIN_PASSWORD) {
        const token = jwt.sign(
            { userId: process.env.ADMIN_ID },
            process.env.JWT_SECRET as string,
            { expiresIn: "7d" }
        );
        res.status(200).json({ message: 'Authenticated', token });
    } else {
        res.status(401).json({ message: 'Invalid password' });
    }
};
