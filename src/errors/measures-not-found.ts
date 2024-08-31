import { BaseError } from './base-error'

export class MeasuresNotFoundError extends BaseError {
  constructor() {
    super({
      error_code: 'MEASURES_NOT_FOUND',
      error_description: 'Nenhuma leitura encontrada',
      status: 404
    })
  }
}
