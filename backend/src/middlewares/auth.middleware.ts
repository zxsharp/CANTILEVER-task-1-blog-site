import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

export const protect: RequestHandler = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        res.status(401).json({ message: 'No token, authorization denied' });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        (req as any).user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};
