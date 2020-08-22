import Knex from 'knex'

export async function up (knex: Knex) {
  return knex.schema.createTable('classes', (table) => {
    table.increments('id').primary()
    table.decimal('cost').notNullable()

    table.integer('subject_id')
      .notNullable()
      .references('subject')
      .inTable('subjects')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')

    table.integer('user_id')
      .notNullable()
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
  return knex.schema.dropTable('classes')
}
