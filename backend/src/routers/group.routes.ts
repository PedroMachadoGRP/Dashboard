import { Router } from "express";
import { GroupController } from "../controllers/group.controle";


const router = Router()
const groupController = new GroupController()

router.get('/',groupController.list.bind(groupController))
router.post('/',groupController.create.bind(groupController))
router.patch('/:id', groupController.update.bind(groupController))
router.delete('/:id',groupController.remove.bind(groupController))

export default router