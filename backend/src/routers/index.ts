import { Router } from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import groupRoutes from "./group.routes";


const router = Router()

router.use('/auth',authRoutes)
router.use('/users',userRoutes)
router.use('/groups',groupRoutes)


export default router