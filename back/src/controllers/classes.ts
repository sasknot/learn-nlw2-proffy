import { Request, Response } from 'express'
import db from '../services/database'
import convertHourToMinutes from '../helpers/convert_hour_to_minutes'

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

interface ClassesFilters {
  week_day?: string;
  subject?: string;
  time?: string;
}

export default class ClassesController {
  async create (req: Request, res: Response) {
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

  async list (req: Request, res: Response) {
    const filters = req.query as ClassesFilters

    if (!filters.week_day || !filters.subject || !filters.time) {
      return res.status(400).json({
        error: 'Missing filters to search classes'
      })
    }

    const weekDay = Number(filters.week_day)
    const timeInMinutes = convertHourToMinutes(filters.time)

    const classes = await db('classes')
      .whereExists(function () {
        this.select('class_schedules.*')
          .from('class_schedules')
          .whereRaw('`class_schedules`.`class_id` = `classes`.`id`')
          .whereRaw('`class_schedules`.`week_day` = ??', [weekDay])
          .whereRaw('`class_schedules`.`from` <= ??', [timeInMinutes])
          .whereRaw('`class_schedules`.`to` > ??', [timeInMinutes])
      })
      .where('classes.subject', '=', filters.subject)
      .join('users', 'classes.user_id', '=', 'users.id')
      .select(['classes.*', 'users.*'])

    return res.json(classes)
  }
}
