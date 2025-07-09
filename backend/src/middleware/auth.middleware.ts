import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const auth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            res.status(401).json({ message: 'No token, authorization denied' });
            return;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as any;
        (req as any).user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

// Alternative export name if used differently
export const protect = auth;
