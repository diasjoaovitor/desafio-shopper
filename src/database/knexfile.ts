import { Knex } from 'knex'
import path from 'path'
import dotenv from 'dotenv'
import { expand } from 'dotenv-expand'

expand(dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env') }))

const config: Knex.Config = {
  client: 'pg',
  connection: process.env.DATABASE_URL,
  migrations: {
    directory: path.resolve(__dirname, 'migrations')
  },
  seeds: {
    directory: path.resolve(__dirname, 'seeds')
  }
}

const knexConfig: { [key: string]: Knex.Config } = {
  development: config,
  test: config,
  production: config
}

export default knexConfig
