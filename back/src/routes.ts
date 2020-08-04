import express from 'express'
import ClassesController from './controllers/classes'
import ConnectionsController from './controllers/connections'

const routes = express.Router()
const classesController = new ClassesController()
const connectionsController = new ConnectionsController()

routes.get('/classes', classesController.list)
routes.post('/classes', classesController.create)

routes.get('/connections', connectionsController.list)
routes.post('/connections', connectionsController.create)

export default routes
