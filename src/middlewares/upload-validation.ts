import { InvalidDataError } from '@/errors'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

const uploadSchema = z.object({
  image: z
    .string({ message: 'Imagem base64 deve ser uma string válida' })
    .min(1, { message: 'Imagem base64 é requerida' })
    .refine(
      (value) => Buffer.from(value, 'base64').toString('base64') === value,
      {
        message: 'Imagem base64 inválida'
      }
    ),
  customer_code: z
    .string({ message: 'Código do cliente inválido' })
    .min(1, { message: 'Código do cliente inválido' }),
  measure_datetime: z
    .string()
    .refine((value) => !isNaN(Date.parse(value)), { message: 'Data inválida' }),
  measure_type: z.enum(['WATER', 'GAS'], {
    message: 'Tipo de medida deve ser "WATER" ou "GAS"'
  })
})

export const validateUpload = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    uploadSchema.parse(req.body)
    next()
  } catch (error: unknown) {
    const { error_code, error_description, status } = new InvalidDataError(
      (error as z.ZodError).errors[0].message
    )
    res.status(status).json({ error_code, error_description })
  }
}
