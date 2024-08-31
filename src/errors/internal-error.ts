import { BaseError } from './base-error'

export class InternalError extends BaseError {
  constructor() {
    super({
      error_code: 'INTERNAL_ERROR',
      error_description: 'Ocorreu um erro ao processar a leitura',
      status: 500
    })
  }
}
