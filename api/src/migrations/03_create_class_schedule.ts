import Knex from 'knex'

export async function up (knex: Knex) {
  return knex.schema.createTable('class_schedules', (table) => {
    table.increments('id').primary()
    table.enum('week_day', [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday'
    ]).notNullable()
    table.time('from').notNullable()
    table.time('to').notNullable()

    table.integer('class_id')
      .notNullable()
      .references('id')
      .inTable('classes')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')

    table.timestamp('created_at')
      .defaultTo(knex.fn.now())
      .notNullable()
    table.timestamp('updated_at')
      .defaultTo(knex.fn.now())
      .notNullable()
  })
}

export async function down (knex: Knex) {
  return knex.schema.dropTable('class_schedules')
}
