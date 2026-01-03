import { Router } from "express";
import { UserController } from "../controllers/user.controler";
import { authMiddleware } from "../middlewares/authMiddleware";


const router = Router()
const controller = new UserController()

router.get('/',authMiddleware,controller.list.bind(controller))
router.get('/:id',authMiddleware,controller.getById.bind(controller))

router.patch('/update/:id',authMiddleware, controller.update.bind(controller))
router.delete('/delete/:id',authMiddleware, controller.remove.bind(controller))

export default router