import { AppoinmentValidationError } from '@Domain/errors/AppoinmentValidationError'
import { Appoinment } from '@Domain/models/Appointment'

describe('Appoinment test', () => {
  it('should create an instance of appoinment', () => {
    const id = 1
    const startDate = new Date()
    const endDate = new Date()
    endDate.setDate(endDate.getDate() + 5)
    const createdAt = new Date()
    const updatedAt = new Date()

    expect(
      new Appoinment(id, startDate, endDate, createdAt, updatedAt)
    ).toBeInstanceOf(Appoinment)
  })

  it('should throw an error when appoinment start and due is the same', () => {
    const id = 1
    const startDate = new Date()
    const endDate = new Date()
    const createdAt = new Date()
    const updatedAt = new Date()

    expect(
      () => new Appoinment(id, startDate, endDate, createdAt, updatedAt)
    ).toThrow(
      new AppoinmentValidationError(
        'The start date and end date it should not be the same'
      )
    )
  })
})
