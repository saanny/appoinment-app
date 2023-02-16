export class AppoinmentValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AppoinmentValidationError'
  }
}
