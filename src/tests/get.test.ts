import request from 'supertest'
import app from '@/app'
import { measureDBMock } from './mocks'
import { LLMService } from '@/services'
import { TMeasureDBModel } from '@/models'
import { knex } from '@/database'

jest.mock('@/services/llm-service')

describe('GET /<customer code>/list', () => {
  beforeAll(async () => {
    jest.spyOn(LLMService.prototype, 'measureImage').mockResolvedValue(12345)
    await knex('measures').insert(measureDBMock)
    await knex('measures').insert({
      ...measureDBMock,
      measure_type: 'GAS',
      measure_uuid: 'f47ac10b-58cc-4372-a567-0e02b2c3d478'
    } as TMeasureDBModel)
  })

  it('should return 200 and a valid response when data is correct and has no params', async () => {
    const { body, status } = await request(app).get(
      `/${measureDBMock.customer_code}/list`
    )
    expect(status).toBe(200)
    expect(body).toHaveLength(2)
  })

  it('should return 200 a valid response when data is correct and has param equal to "WaTeR" (case insensitive)', async () => {
    const { body, status } = await request(app).get(
      `/${measureDBMock.customer_code}/list?measure_type=WaTeR`
    )
    expect(status).toBe(200)
    expect(body).toHaveLength(1)
    expect(body[0].measure_type).toBe('WATER')
  })

  it('should return 200 a valid response when data is correct and has param equal to "gAs" (case insensitive)', async () => {
    const { body, status } = await request(app).get(
      `/${measureDBMock.customer_code}/list?measure_type=gAs`
    )
    expect(status).toBe(200)
    expect(body).toHaveLength(1)
    expect(body[0].measure_type).toBe('GAS')
  })

  it('should return 400 if type is invalid', async () => {
    const { body, status } = await request(app).get(
      `/${measureDBMock.customer_code}/list?measure_type=other`
    )
    expect(status).toBe(400)
    expect(body).toEqual({
      error_code: 'INVALID_DATA',
      error_description: 'Tipo de medida deve ser "WATER" ou "GAS"'
    })
  })

  it('should return 404 if no measures exists', async () => {
    const { body, status } = await request(app).get(`/other/list`)
    expect(status).toBe(404)
    expect(body).toEqual({
      error_code: 'MEASURES_NOT_FOUND',
      error_description: 'Nenhuma leitura encontrada'
    })
  })
})
