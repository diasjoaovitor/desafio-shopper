import request from 'supertest'
import app from '@/app'
import { measureDBMock } from './mocks'
import { LLMService } from '@/services'
import { TMeasureConfirmRequestBodyModel } from '@/models'
import { knex } from '@/database'

jest.mock('@/services/llm-service')

let measure_uuid: string = ''

describe('PATCH /confirm', () => {
  beforeAll(async () => {
    jest.spyOn(LLMService.prototype, 'measureImage').mockResolvedValue(12345)
    await knex('measures').insert(measureDBMock)
  })

  it('should return 200 and a valid response when data is correct', async () => {
    const data = await knex('measures').select().first()
    measure_uuid = data.measure_uuid
    expect(data.has_confirmed).toBeFalsy()

    const { body, status } = await request(app)
      .patch('/confirm')
      .send({
        measure_uuid,
        confirmed_value: 12
      } as TMeasureConfirmRequestBodyModel)
    expect(status).toBe(200)
    expect(body).toEqual({ success: true })

    const data2 = await knex('measures').select().first()
    expect(data2.has_confirmed).toBeTruthy()
    expect(data2.measure_value).toBe('12')
  })

  it('should return 400 if uuid is invalid', async () => {
    const { body, status } = await request(app)
      .patch('/confirm')
      .send({
        confirmed_value: 12,
        measure_uuid: 'invalid'
      } as TMeasureConfirmRequestBodyModel)
    expect(status).toBe(400)
    expect(body).toEqual({
      error_code: 'INVALID_DATA',
      error_description: 'UUID inválido'
    })
  })

  it('should return 400 if confirmed value is invalid', async () => {
    const { body, status } = await request(app)
      .patch('/confirm')
      .send({
        measure_uuid,
        confirmed_value: 'invalid' as any
      } as TMeasureConfirmRequestBodyModel)
    expect(status).toBe(400)
    expect(body).toEqual({
      error_code: 'INVALID_DATA',
      error_description: 'Valor confirmado inválido'
    })
  })

  it('should return 404 if measure does not exist', async () => {
    const { body, status } = await request(app)
      .patch('/confirm')
      .send({
        measure_uuid: 'f47ac10b-58cc-4372-a567-0e02b2c3d478',
        confirmed_value: 12
      } as TMeasureConfirmRequestBodyModel)
    expect(status).toBe(404)
    expect(body).toEqual({
      error_code: 'MEASURE_NOT_FOUND',
      error_description: 'Leitura não encontrada'
    })
  })

  it('should return 409 if measure is already confirmed', async () => {
    const { body, status } = await request(app)
      .patch('/confirm')
      .send({
        measure_uuid,
        confirmed_value: 12
      } as TMeasureConfirmRequestBodyModel)
    expect(status).toBe(409)
    expect(body).toEqual({
      error_code: 'CONFIRMATION_DUPLICATE',
      error_description: 'Leitura já confirmada'
    })
  })
})
