import { Router } from 'express'
import create from './create'
import list from './list'

export default Router()
  .get('/connections', list)
  .post('/connections', create)
