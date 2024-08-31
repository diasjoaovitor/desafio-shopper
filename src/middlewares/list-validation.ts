import { InvalidDataError } from '@/errors'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

const listSchema = z.object({
  customer_code: z
    .string({ message: 'Código do cliente inválido' })
    .min(1, { message: 'Código do cliente inválido' }),
  measure_type: z
    .string()
    .refine((val) => ['WATER', 'GAS'].includes(val.toUpperCase()), {
      message: 'Tipo de medida deve ser "WATER" ou "GAS"'
    })
    .transform((val) => val.toUpperCase())
})

export const validateList = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { customer_code } = req.params
    const { measure_type } = req.query
    listSchema.parse({ customer_code, measure_type: measure_type || 'WATER' })
    next()
  } catch (error: unknown) {
    const { error_code, error_description, status } = new InvalidDataError(
      (error as z.ZodError).errors[0].message
    )
    res.status(status).json({ error_code, error_description })
  }
}
