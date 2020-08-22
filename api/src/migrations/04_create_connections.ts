import Knex from 'knex'

export async function up (knex: Knex) {
  return knex.schema.createTable('connections', (table) => {
    table.increments('id').primary()

    table.integer('teacher_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')

    table.integer('student_id')
      .references('id')
      .inTable('users')
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
  return knex.schema.dropTable('connections')
}
