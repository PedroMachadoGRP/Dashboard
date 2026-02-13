import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";

interface AuthRequest extends Request {
    user?: any
}


export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // const authHeader = req.headers.authorization

    // if (!authHeader || !authHeader.startsWith('Bearer ')) {
    //     return res.status(401).json({message:'token não fornecido'})
    // }

    // const token = authHeader.split(' ')[1]

    const token = req.cookies?.token

    if (!token) {
        return res.status(401).json({
            message: "Não autenticado"
        })
    }

    const decoded = verifyToken(token)

    if (!decoded) {
        return res.status(401).json({ message: 'Token invalido' })
    }

    (req as any).user = decoded

    next()
}