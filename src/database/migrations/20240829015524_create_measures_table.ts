import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('measures', (table) => {
    table.uuid('measure_uuid').primary()
    table.string('customer_code').notNullable()
    table.datetime('measure_datetime').defaultTo(knex.fn.now())
    table.enu('measure_type', ['WATER', 'GAS']).notNullable()
    table.string('measure_value').notNullable()
    table.string('image_url').notNullable()
    table.boolean('has_confirmed').defaultTo(false)
    table.timestamps(true, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('measures')
}
