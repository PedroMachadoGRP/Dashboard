import { Request, Response } from "express";
import { GroupService } from "../services/group.services";


const services = new GroupService()

export class GroupController {
    async create(req: Request, res: Response) {

        try {
            const group = await services.create(req.body)
            res.status(201).json(group)
        } catch (e: any) {
            res.status(400).json({ message: e.message })
        }
    }

    async list(req: Request, res: Response) {
        try {
            const groups = await services.findAll()
            res.json(groups)
        } catch (e: any) {
            res.status(400).json({ message: e.message })
        }
    }

    async update(req: Request, res: Response) {
        try {
            const group = await services.update(Number(req.params.id), req.body)
            res.json(group)
        } catch (e: any) {
            res.status(400).json({ message: e.message })
        }
    }

    async remove(req: Request, res: Response) {
        try {
            const group = await services.delete(Number(req.params.id))
            return res.json({ message: "Group successfully deleted" })
        } catch (e: any) {
            res.status(404).json({ message: e.message })
        }
    }
}