import request from 'supertest'
import app from '@/app'
import { measureRequestBodyMock } from './mocks'
import { LLMService } from '@/services'
import { TMeasureRequestBodyModel } from '@/models'

jest.mock('@/services/llm-service')

describe('POST /upload', () => {
  it('should return 200 and a valid response when data is correct', async () => {
    jest.spyOn(LLMService.prototype, 'measureImage').mockResolvedValue(12345)
    const { body, status } = await request(app)
      .post('/upload')
      .send(measureRequestBodyMock)
    expect(status).toBe(200)
    expect(body).toHaveProperty('image_url')
    expect(body).toHaveProperty('measure_value')
    expect(body).toHaveProperty('measure_uuid')
    expect(body.measure_value).toBe(12345)
  })

  it('should return 400 if image base64 is invalid', async () => {
    const { body, status } = await request(app)
      .post('/upload')
      .send({
        ...measureRequestBodyMock,
        image: 'invalid'
      } as TMeasureRequestBodyModel)
    expect(status).toBe(400)
    expect(body).toEqual({
      error_code: 'INVALID_DATA',
      error_description: 'Imagem base64 inválida'
    })
  })

  it('should return 400 if customer code is invalid', async () => {
    const { body, status } = await request(app)
      .post('/upload')
      .send({
        ...measureRequestBodyMock,
        customer_code: ''
      } as TMeasureRequestBodyModel)
    expect(status).toBe(400)
    expect(body).toEqual({
      error_code: 'INVALID_DATA',
      error_description: 'Código do cliente inválido'
    })
  })

  it('should return 400 if datetime is invalid', async () => {
    const { body, status } = await request(app)
      .post('/upload')
      .send({
        ...measureRequestBodyMock,
        measure_datetime: '2024/2024'
      } as TMeasureRequestBodyModel)
    expect(status).toBe(400)
    expect(body).toEqual({
      error_code: 'INVALID_DATA',
      error_description: 'Data inválida'
    })
  })

  it('should return 400 if type is invalid', async () => {
    const { body, status } = await request(app)
      .post('/upload')
      .send({
        ...measureRequestBodyMock,
        measure_type: 'invalid' as any
      } as TMeasureRequestBodyModel)
    expect(status).toBe(400)
    expect(body).toEqual({
      error_code: 'INVALID_DATA',
      error_description: 'Tipo de medida deve ser "WATER" ou "GAS"'
    })
  })

  it('should return 409 if reading already exists for the month', async () => {
    const { body, status } = await request(app)
      .post('/upload')
      .send(measureRequestBodyMock)
    expect(status).toBe(409)
    expect(body).toEqual({
      error_code: 'DOUBLE_REPORT',
      error_description: 'Leitura do mës já realizada'
    })
    const { status: s } = await request(app)
      .post('/upload')
      .send({
        ...measureRequestBodyMock,
        measure_datetime: '2024-10-29T00:00:00Z'
      } as TMeasureRequestBodyModel)
    expect(s).toBe(200)
  })

  it('should return 500 if for internal error', async () => {
    jest
      .spyOn(LLMService.prototype, 'measureImage')
      .mockRejectedValue(new Error())
    const { body, status } = await request(app)
      .post('/upload')
      .send({
        ...measureRequestBodyMock,
        customer_code: '000'
      } as TMeasureRequestBodyModel)
    expect(status).toBe(500)
    expect(body).toEqual({
      error_code: 'INTERNAL_ERROR',
      error_description: 'Ocorreu um erro ao processar a leitura'
    })
  })
})
