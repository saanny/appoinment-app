import { AppoinmentValidationError } from '@Domain/errors/AppoinmentValidationError'

export class Appoinment {
  constructor(
    private id: number,
    private start: Date,
    private end: Date,
    private createdAt: Date,
    private updatedAt: Date
  ) {
    if (this.start.getTime() === this.end.getTime())
      throw new AppoinmentValidationError(
        'The start date and end date it should not be the same'
      )
  }
}
