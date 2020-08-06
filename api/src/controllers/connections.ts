import { Request, Response } from 'express'
import db from '../services/database'

export default class ConnectionsController {
  async create (req: Request, res: Response) {
    const { user_id: userId } = req.body

    await db('connections').insert({
      user_id: userId
    })

    return res.status(201).send()
  }

  async list (req: Request, res: Response) {
    const [{ total }] = await db('connections').count('* as total')

    return res.json({ total })
  }
}
