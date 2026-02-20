import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { generateToken } from "../utils/jwt";
import { AppError } from "../errors/AppError";

const service = new UserService()

export class AuthController {
    async register(req: Request, res: Response) {

        try {

            const user = await service.create(req.body)
            res.status(201).json(user)

        } catch (error: any) {

            if (error instanceof AppError) {
                return res.status(error.statusCode).json({ message: error.message });
            }

            console.error(error);
            return res.status(500).json({ message: "Internal server Error" });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body

            const user = await service.findEmail(email)

            if (!user) throw new Error("Usuário não encontrado");

            const valid = await user.validatePassword(password)
            if (!valid) return res.status(401).json({ message: 'Senha inválida' })

            const safe: any = { ...user }
            delete safe.password

            const token = generateToken({ id: user.id, email: user.email })

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 60 * 60 * 1000
            })
            return res.status(200).json({ user: safe })

        } catch (error: any) {
            res.status(400).json({ message: error.message })
        }
    }
    async logout(req: Request, res: Response) {

        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        })

        return res.status(200).json({
            message: "Logout realizado com sucesso"
        })
    }
    async me(req:Request, res:Response){
        try {
            const userData = (req as any).user

            if(!userData?.id){
                return res.status(401).json({message:"Auth Error"})
            }

            const user = await service.findById(userData.id)

            if(!user){
                return res.status(404).json({message:"Usuário não encontrado"})
            }

            const safeUser:any = {...user}
            delete safeUser.password

            return res.status(200).json(safeUser)

        }catch(error:any){
            return res.status(500).json({message:"Internal error"})
        }
    }

}