import { Router } from 'express'
import create from './create'
import list from './list'

export default Router()
  .get('/classes', list)
  .post('/classes', create)
