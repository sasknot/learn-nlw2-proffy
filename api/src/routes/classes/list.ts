import { Request, Response } from 'express'
import db from '../../services/database'
import convertHourToMinutes from '../../helpers/convert_hour_to_minutes'

interface ClassesFilters {
  week_day?: string
  subject?: string
  time?: string
}

export default async function (req: Request, res: Response) {
  const filters = req.query as ClassesFilters
  const filterWeekDay = Number(filters.week_day)
  const filterTime = filters.time ? convertHourToMinutes(filters.time) : false

  const query = db('classes')
    .whereExists(function () {
      const subQuery = this.select('class_schedules.*')
        .from('class_schedules')
        .whereRaw('`class_schedules`.`class_id` = `classes`.`id`')

      if (filterWeekDay) {
        subQuery.whereRaw('`class_schedules`.`week_day` = ??', [filterWeekDay])
      }

      if (filterTime) {
        subQuery.whereRaw('`class_schedules`.`from` <= ??', [filterTime])
          .whereRaw('`class_schedules`.`to` > ??', [filterTime])
      }

      return subQuery
    })
    .join('users', 'classes.user_id', '=', 'users.id')
    .select(['classes.*', 'users.*'])

  if (filters.subject) {
    query.where('classes.subject', '=', filters.subject)
  }

  const classes = await query

  return res.json(await classes)
}
