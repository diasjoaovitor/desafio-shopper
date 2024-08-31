import { BaseError } from './base-error'

export class MeasureNotFoundError extends BaseError {
  constructor() {
    super({
      error_code: 'MEASURE_NOT_FOUND',
      error_description: 'Leitura não encontrada',
      status: 404
    })
  }
}
