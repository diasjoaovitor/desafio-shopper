import { BaseError } from './base-error'

export class MeasureAlreadyExistsError extends BaseError {
  constructor() {
    super({
      error_code: 'DOUBLE_REPORT',
      error_description: 'Leitura do mës já realizada',
      status: 409
    })
  }
}
