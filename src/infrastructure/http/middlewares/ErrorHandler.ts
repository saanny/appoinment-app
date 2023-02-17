import { AppoinmentValidationError } from '@Domain/errors/AppoinmentValidationError'
import { NextFunction, Request, Response } from 'express'
import { RequestValidationError } from '../RequestValidationError'

export function errorHandler(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
): void {
  if (
    error instanceof RequestValidationError ||
    error instanceof AppoinmentValidationError
  ) {
    response.status(400).json({
      name: error.name,
      message: error.message,
    })
  } else {
    response.status(500).json({
      name: 'InternalServerError',
      message: 'Something went wrong',
    })
  }
}
