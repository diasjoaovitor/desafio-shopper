import { Request, Response } from 'express'
import { v4 as uuid } from 'uuid'
import {
  TMeasureConfirmRequestBodyModel,
  TMeasureRequestBodyModel,
  TMeasureType
} from '@/models'
import { MeasureService, LLMService } from '@/services'
import {
  InternalError,
  MeasureAlreadyConfirmedError,
  MeasureAlreadyExistsError,
  MeasureNotFoundError,
  MeasuresNotFoundError
} from '@/errors'
import { getFilePath, saveImage } from '@/utils'

export const uploadImage = async (req: Request, res: Response) => {
  const data: TMeasureRequestBodyModel = req.body
  try {
    const measureService = new MeasureService()

    const existingMeasure = await measureService.measureExists(data)
    if (existingMeasure) {
      const { error_code, error_description, status } =
        new MeasureAlreadyExistsError()
      return res.status(status).json({ error_code, error_description })
    }

    const { image: imageBase64, ...rest } = data
    const llmService = new LLMService()
    const measure_value = await llmService.measureImage({
      imageBase64,
      measureType: rest.measure_type
    })
    const measure_uuid = uuid()
    const fileName = `${measure_uuid}.jpg`
    const image_url = `${process.env.BASE_URL}/uploads/${fileName}`
    await measureService.createMeasure({
      ...rest,
      measure_value,
      measure_uuid,
      image_url,
      has_confirmed: false
    })
    const filePath = await getFilePath(fileName)
    await saveImage({ imageBase64, filePath })
    res.status(200).json({ image_url, measure_value, measure_uuid })
  } catch (error) {
    console.error(error)
    const { error_code, error_description, status } = new InternalError()
    res.status(status).json({ error_code, error_description })
  }
}

export const confirmMeasure = async (req: Request, res: Response) => {
  const { confirmed_value, measure_uuid } =
    req.body as TMeasureConfirmRequestBodyModel
  try {
    const measureService = new MeasureService()
    const measure = await measureService.getMeasureByUuid(measure_uuid)
    if (!measure) {
      const { error_code, error_description, status } =
        new MeasureNotFoundError()
      return res.status(status).json({ error_code, error_description })
    }
    if (measure.has_confirmed) {
      const { error_code, error_description, status } =
        new MeasureAlreadyConfirmedError()
      return res.status(status).json({ error_code, error_description })
    }
    await measureService.confirmMeasure({ measure_uuid, confirmed_value })
    res.status(200).json({ success: true })
  } catch (error) {
    console.error(error)
    const { error_code, error_description, status } = new InternalError()
    res.status(status).json({ error_code, error_description })
  }
}

export const getMeasures = async (req: Request, res: Response) => {
  const { customer_code } = req.params as { customer_code: string }
  const { measure_type } = req.query as {
    measure_type: TMeasureType | undefined
  }
  try {
    const measureService = new MeasureService()
    const measures = await measureService.getMeasures({
      customer_code,
      measure_type
    })
    if (!measures.length) {
      const { error_code, error_description, status } =
        new MeasuresNotFoundError()
      return res.status(status).json({ error_code, error_description })
    }
    res.status(200).json(measures)
  } catch (error) {
    console.error(error)
    const { error_code, error_description, status } = new InternalError()
    res.status(status).json({ error_code, error_description })
  }
}
