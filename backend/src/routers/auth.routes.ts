import { Router } from "express";
import { AuthController } from "../controllers/auth.controler";
import { validateSchema } from "../middlewares/createUserMiddleware";
import { createUserSchema } from "../DTOS/CreateUserDTO";


const router = Router()
const controller = new AuthController()

router.post('/register',validateSchema(createUserSchema),controller.register.bind(controller))
router.post('/login',controller.login.bind(controller))

export default router