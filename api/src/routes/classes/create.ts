import { Request, Response } from 'express'
import db from '../../services/database'
import convertHourToMinutes from '../../helpers/convert_hour_to_minutes'

interface ScheduleItem {
  week_day: number
  from: string
  to: string
}

export default async function (req: Request, res: Response) {
  const {
    name,
    avatar,
    whatsapp,
    bio,
    subject,
    cost,
    schedule
  } = req.body

  const trx = await db.transaction()

  try {
    const [userId] = await trx('users').insert({
      name,
      avatar,
      whatsapp,
      bio
    })

    const [classId] = await trx('classes').insert({
      subject,
      cost,
      user_id: userId
    })

    const classSchedules = schedule.map((item: ScheduleItem) => {
      return {
        week_day: item.week_day,
        from: convertHourToMinutes(item.from),
        to: convertHourToMinutes(item.to),
        class_id: classId
      }
    })

    await trx('class_schedules').insert(classSchedules)

    await trx.commit()

    return res.status(201).send('OK')
  } catch (error) {
    trx.rollback()

    return res.status(400).json({
      error: 'Unexpected error while creating new class'
    })
  }
}
