import { InvalidDataError } from '@/errors'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

const confirmSchema = z.object({
  measure_uuid: z
    .string({ message: 'UUID inválido' })
    .uuid({ message: 'UUID inválido' }),
  confirmed_value: z.number({ message: 'Valor confirmado inválido' })
})

export const validateConfirm = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    confirmSchema.parse(req.body)
    next()
  } catch (error: unknown) {
    const { error_code, error_description, status } = new InvalidDataError(
      (error as z.ZodError).errors[0].message
    )
    res.status(status).json({ error_code, error_description })
  }
}
