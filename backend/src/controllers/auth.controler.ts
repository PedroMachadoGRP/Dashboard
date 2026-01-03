import { Request, Response } from "express";
import { UserService } from "../services/user.services";
import { generateToken } from "../utils/jwt";

const service = new UserService()

export class AuthController {
    async register(req: Request, res: Response) {
        try {
            const user = await service.create(req.body)
            res.status(201).json(user)
        } catch (e: any) {
            res.status(400).json({ message: e.message })
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body

            const user = await service.findEmail(email)

            if (!user) throw new Error("User not found");

            const valid = await user.validatePassword(password)
            if (!valid) return res.status(401).json({ message: 'invalid password' })

            const safe: any = { ...user }
            delete safe.password

            const token = generateToken({ id: user.id, email: user.email })

            res.json({ user: safe, token })
        } catch (e: any) {
            res.status(400).json({ message: e.message })
        }
    }
}