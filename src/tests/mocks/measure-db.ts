import { TMeasureDBModel, TMeasureRequestBodyModel } from '@/models'
import { measureRequestBodyMock } from './measure-request-body'

const data = {
  ...(measureRequestBodyMock as Omit<TMeasureRequestBodyModel, 'image'> & {
    image?: string
  })
}

delete data.image

export const measureDBMock: TMeasureDBModel = {
  ...data,
  measure_uuid: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  has_confirmed: false,
  measure_value: 12345,
  image_url: `${process.env.BASE_URL}/uploads/f47ac10b-58cc-4372-a567-0e02b2c3d479.png`
}
