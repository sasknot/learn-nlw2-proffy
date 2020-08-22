import { Request, Response } from 'express'
import db from '../../services/database'

export default async function (req: Request, res: Response) {
  const { user_id: userId } = req.body

  await db('connections').insert({
    user_id: userId
  })

  return res.status(201).send()
}
