export class BaseError extends Error {
  status: number
  error_code: string
  error_description: string

  constructor({
    status,
    error_code,
    error_description
  }: {
    status: number
    error_code: string
    error_description: string
  }) {
    super()
    this.status = status
    this.error_code = error_code
    this.error_description = error_description
  }
}
