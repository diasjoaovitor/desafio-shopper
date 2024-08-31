import { knex } from './src/database/db'

beforeAll(async () => {
  await knex.migrate.latest()
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

afterAll(async () => {
  await knex.migrate.rollback()
  await knex.destroy()
  jest.restoreAllMocks()
})
