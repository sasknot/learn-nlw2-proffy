import Knex from 'knex'

export async function up (knex: Knex) {
  return knex.schema.createTable('subjects', (table) => {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.string('description')

    table.timestamp('created_at')
      .defaultTo(knex.fn.now())
      .notNullable()
    table.timestamp('updated_at')
      .defaultTo(knex.fn.now())
      .notNullable()
  })
}

export async function down (knex: Knex) {
  return knex.schema.dropTable('subjects')
}
