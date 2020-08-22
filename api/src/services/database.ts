import path from 'path'
import knex from 'knex'

import * as config from '../../knexfile'

export default knex(config)

// class Database {
//   knex: any = {}
//   tableName: string = ''

//   constructor (tableName: string) {
//     this.knex = knex(config)
//     this.tableName = tableName
//   }

//   create (data: object) {
//     return this.knex(this.tableName)
//       .insert(data)
//   }

//   read (conditions: object, fields: any = '*') {
//     return this.knex(this.tableName)
//       .select(fields)
//       .where(conditions)
//   }

//   update (conditions: object, data: object) {
//     return this.knex(this.tableName)
//       .update(data)
//       .where(conditions)
//   }

//   destroy (conditions: object) {
//     return this.knex(this.tableName)
//       .del()
//       .where(conditions)
//   }
// }

// export default new Database()
