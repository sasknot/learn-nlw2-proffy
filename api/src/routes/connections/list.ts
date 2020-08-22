import { Request, Response } from 'express'
import db from '../../services/database'

export default async function (req: Request, res: Response) {
  const [{ total }] = await db('connections').count('* as total')

  return res.json({ total })
}
