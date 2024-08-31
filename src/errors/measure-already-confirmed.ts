import { BaseError } from './base-error'

export class MeasureAlreadyConfirmedError extends BaseError {
  constructor() {
    super({
      error_code: 'CONFIRMATION_DUPLICATE',
      error_description: 'Leitura já confirmada',
      status: 409
    })
  }
}
