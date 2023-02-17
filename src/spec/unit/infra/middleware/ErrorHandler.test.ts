import { AppoinmentValidationError } from '@Domain/errors/AppoinmentValidationError'
import { errorHandler } from '@Infra/http/middlewares/ErrorHandler'
import { RequestValidationError } from '@Infra/http/RequestValidationError'
import { NextFunction, request, Request, response, Response } from 'express'

describe('Error Handler tests', () => {
  it('should generate an Error response for a RequestValidationError', () => {
    const error = new RequestValidationError('Body is not provided')
    const req: Request = request
    const res: Response = response
    const next: NextFunction = jest.fn()
    res.status = jest.fn().mockReturnThis()
    res.json = jest.fn()
    errorHandler(error, req, res, next)

    expect(next).toBeCalledTimes(0)
    expect(res.status).toBeCalledTimes(1)
    expect(res.status).toBeCalledWith(400)
    expect(res.json).toBeCalledTimes(1)
    expect(res.json).toBeCalledWith({
      name: 'RequestValidationError',
      message: 'Body is not provided',
    })
  })

  it('should generate an Error response for a AppoinmentValidationError', () => {
    const error = new AppoinmentValidationError(
      'The start date and end date it should not be the same'
    )
    const req: Request = request
    const res: Response = response
    const next: NextFunction = jest.fn()
    res.status = jest.fn().mockReturnThis()
    res.json = jest.fn()
    errorHandler(error, req, res, next)

    expect(next).toBeCalledTimes(0)
    expect(res.status).toBeCalledTimes(1)
    expect(res.status).toBeCalledWith(400)
    expect(res.json).toBeCalledTimes(1)
    expect(res.json).toBeCalledWith({
      name: 'AppoinmentValidationError',
      message: 'The start date and end date it should not be the same',
    })
  })
})
