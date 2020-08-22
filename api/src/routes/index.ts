import { Router } from 'express'
import ClassesRouter from './classes'
import ConnectionsRouter from './connections'

const router = Router()

router.use(ClassesRouter as Router)
router.use(ConnectionsRouter as Router)

export default router
