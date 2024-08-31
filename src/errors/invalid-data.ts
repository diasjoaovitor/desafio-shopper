import { BaseError } from './base-error'

export class InvalidDataError extends BaseError {
  constructor(description?: string) {
    super({
      error_code: 'INVALID_DATA',
      error_description: description || 'Dado inválido',
      status: 400
    })
  }
}
