import { Request, Response } from "express";
import { ActivityService } from "../services/activity.service";


const services = new ActivityService()

export class ActivityController {
    async create(req: Request, res: Response) {
        try {
            const activity = await services.create(req.body)
            res.status(201).json(activity)
        } catch (e: any) {
            res.status(400).json({ message: e.message })
        }


    }
    async list(req: Request, res: Response) {
        try {

            const limit = req.query.limit ? Number(req.query.limit) : undefined

            const activitys = await services.findAll(limit)

            res.json(activitys)
        } catch (e: any) {
            res.status(400).json({ message: e.message })
        }
    }

    async listNext(req: Request, res: Response) {
        try {

            const limit = Number(req.query.limit) || 5
            const offset = Number(req.query.offset) || 0

            const activitys = await services.findNext(limit, offset)

            res.json(activitys)
        } catch (e: any) {
            res.status(400).json({ message: e.message })
        }
    }

    async update(req: Request, res: Response) {
        try {
            const activity = await services.update(Number(req.params.id), req.body)
            res.json(activity)
        } catch (e: any) {
            res.status(400).json({ message: e.message })
        }
    }

    async remove(req: Request, res: Response) {
        try {
            const activity = await services.delete(Number(req.params.id))

            return res.json({ message: "Atividade deletada com sucesso" })
        } catch (e: any) {
            res.status(400).json({ message: e.message })
        }
    }
}