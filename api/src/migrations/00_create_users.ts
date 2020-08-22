import Knex from 'knex'

export async function up (knex: Knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.string('surname').notNullable()
    table.string('email').notNullable()
    table.string('password').notNullable()
    table.string('reset_password_token')
    table.string('avatar').notNullable()
    table.string('whatsapp').notNullable()
    table.string('bio').notNullable()

    table.timestamp('created_at')
      .defaultTo(knex.fn.now())
      .notNullable()
    table.timestamp('updated_at')
      .defaultTo(knex.fn.now())
      .notNullable()
  })
}

export async function down (knex: Knex) {
  return knex.schema.dropTable('users')
}
