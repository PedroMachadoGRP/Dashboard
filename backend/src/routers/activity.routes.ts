import { Router } from "express";
import { ActivityController } from "../controllers/activity.controller";
import { authMiddleware } from "../middlewares/authMiddleware";



const router = Router()
const controller = new ActivityController()

router.post('/create',authMiddleware,controller.create.bind(controller))
router.get('/',authMiddleware,controller.list.bind(controller))
router.patch('/update/:id',authMiddleware,controller.update.bind(controller))
router.delete('/delete/:id',authMiddleware,controller.remove.bind(controller))

export default router