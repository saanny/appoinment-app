import { AppoinmentValidationError } from '@Domain/errors/AppoinmentValidationError'

describe('AppoinmentValidationError test', () => {
  it('should create a AppoinmentValidationError error', () => {
    const error = new AppoinmentValidationError(
      'The start date and end date it should not be the same'
    )

    expect(error).toBeInstanceOf(AppoinmentValidationError)
    expect(error.name).toBe('AppoinmentValidationError')
    expect(error.message).toBe(
      'The start date and end date it should not be the same'
    )
  })
})
