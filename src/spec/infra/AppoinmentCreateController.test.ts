import { AppoinmentController } from '@Application/AppoinmentController'
import { AppoinmentValidationError } from '@Domain/errors/AppoinmentValidationError'
import { Appoinment } from '@Domain/models/Appointment'
import { RequestValidationError } from '@Infra/http/RequestValidationError'
import { request, Request, response, Response } from 'express'
import { AppoinmentStorer } from 'src/services/AppoinmentStorer'

describe('AppoinmentController', () => {
  it('should throw an error if id not provided', async () => {
    const req: Request = expect.any(request)
    req.body = {
      appoinments: [
        {
          start: new Date(),
          createdAt: '2020-09-02 14:23:12',
          updatedAt: '2020-09-28 14:23:12',
        },
      ],
    }
    const res: Response = response
    const next = jest.fn()
    const appoinmentStorer: AppoinmentStorer = {
      storeAppoinment: jest.fn(),
    }
    const appoinmentController = new AppoinmentController(appoinmentStorer)
    await appoinmentController.createAppoinment(req, res, next)

    expect(next).toBeCalledTimes(1)
    expect(next).toBeCalledWith(
      new RequestValidationError('Id is not provided')
    )
  })

  it('should throw an error if start or end date not provided', async () => {
    const req: Request = expect.any(request)
    req.body = {
      appoinments: [
        {
          id: 1,
          start: new Date(),
          createdAt: '2020-09-02 14:23:12',
          updatedAt: '2020-09-28 14:23:12',
        },
      ],
    }
    const res: Response = response
    const next = jest.fn()
    const appoinmentStorer: AppoinmentStorer = {
      storeAppoinment: jest.fn(),
    }
    const appoinmentController = new AppoinmentController(appoinmentStorer)
    await appoinmentController.createAppoinment(req, res, next)

    expect(next).toBeCalledTimes(1)
    expect(next).toBeCalledWith(
      new RequestValidationError('Start or end date is not provided')
    )
  })

  it('should throw an error if start or end date not provided', async () => {
    const req: Request = expect.any(request)
    req.body = {
      appoinments: [
        {
          id: 1,
          end: new Date(),
          createdAt: '2020-09-02 14:23:12',
          updatedAt: '2020-09-28 14:23:12',
        },
      ],
    }
    const res: Response = response
    const next = jest.fn()
    const appoinmentStorer: AppoinmentStorer = {
      storeAppoinment: jest.fn(),
    }
    const appoinmentController = new AppoinmentController(appoinmentStorer)
    await appoinmentController.createAppoinment(req, res, next)

    expect(next).toBeCalledTimes(1)
    expect(next).toBeCalledWith(
      new RequestValidationError('Start or end date is not provided')
    )
  })

  it('should throw an error if start or end date not provided', async () => {
    const req: Request = expect.any(request)
    req.body = {
      appoinments: [
        {
          id: 1,
          start: new Date(),
          createdAt: '2020-09-02 14:23:12',
          updatedAt: '2020-09-28 14:23:12',
        },
      ],
    }
    const res: Response = response
    const next = jest.fn()
    const appoinmentStorer: AppoinmentStorer = {
      storeAppoinment: jest.fn(),
    }
    const appoinmentController = new AppoinmentController(appoinmentStorer)
    await appoinmentController.createAppoinment(req, res, next)

    expect(next).toBeCalledTimes(1)
    expect(next).toBeCalledWith(
      new RequestValidationError('Start or end date is not provided')
    )
  })

  it('should throw an error if createdAt not provided', async () => {
    const req: Request = expect.any(request)
    req.body = {
      appoinments: [
        {
          id: 1,
          start: '2020-10-10 20:20',
          end: '2020-10-10 20:30',
          updatedAt: '2020-09-28 14:23:12',
        },
      ],
    }
    const res: Response = response
    const next = jest.fn()
    const appoinmentStorer: AppoinmentStorer = {
      storeAppoinment: jest.fn(),
    }
    const appoinmentController = new AppoinmentController(appoinmentStorer)
    await appoinmentController.createAppoinment(req, res, next)

    expect(next).toBeCalledTimes(1)
    expect(next).toBeCalledWith(
      new RequestValidationError('CreatedAt or updatedAt is not provided')
    )
  })
  it('should throw an error if updatedAt not provided', async () => {
    const req: Request = expect.any(request)
    req.body = {
      appoinments: [
        {
          id: 1,
          start: '2020-10-10 20:20',
          end: '2020-10-10 20:30',
          createdAt: '2020-09-02 14:23:12',
        },
      ],
    }
    const res: Response = response
    const next = jest.fn()
    const appoinmentStorer: AppoinmentStorer = {
      storeAppoinment: jest.fn(),
    }
    const appoinmentController = new AppoinmentController(appoinmentStorer)
    await appoinmentController.createAppoinment(req, res, next)

    expect(next).toBeCalledTimes(1)
    expect(next).toBeCalledWith(
      new RequestValidationError('CreatedAt or updatedAt is not provided')
    )
  })
  it('should return an error if createdAt or updatedAt was not Date', async () => {
    const req: Request = expect.any(request)
    req.body = {
      appoinments: [
        {
          id: 1,
          start: new Date(),
          end: '2020-09-02 14:23:12',
          createdAt: '2020-09-02 14:23:12',
          updatedAt: 'asdasdgg',
        },
      ],
    }
    const res: Response = response
    const next = jest.fn()
    const appoinmentStorer: AppoinmentStorer = {
      storeAppoinment: jest.fn(),
    }
    const appoinmentController = new AppoinmentController(appoinmentStorer)
    await appoinmentController.createAppoinment(req, res, next)

    expect(next).toBeCalledTimes(1)
    expect(next).toBeCalledWith(
      new RequestValidationError(
        'Please provide valid format for createdAt or updatedAt date fields'
      )
    )
  })

  it('should return an error if start and end date was the same', async () => {
    const req: Request = expect.any(request)
    req.body = {
      appoinments: [
        {
          id: 1,
          start: new Date(),
          end: new Date(),
          createdAt: '2020-09-02 14:23:12',
          updatedAt: '2020-09-28 14:23:12',
        },
      ],
    }
    const res: Response = response
    const next = jest.fn()
    const appoinmentStorer: AppoinmentStorer = {
      storeAppoinment: jest.fn(),
    }
    const appoinmentController = new AppoinmentController(appoinmentStorer)
    await appoinmentController.createAppoinment(req, res, next)

    expect(next).toBeCalledTimes(1)
    expect(next).toBeCalledWith(
      new AppoinmentValidationError(
        'The start date and end date it should not be the same'
      )
    )
  })

  it('should store appoinment and return appoinment', async () => {
    const req: Request = expect.any(request)
    req.body = {
      appoinments: [
        {
          id: 1,
          start: '2020-10-10 20:20',
          end: '2020-10-10 20:30',
          createdAt: '2020-09-02 14:23:12',
          updatedAt: '2020-09-28 14:23:12',
        },
      ],
    }
    const res: Response = response
    res.status = jest.fn().mockReturnThis()
    res.json = jest.fn()
    const next = jest.fn()
    const appoinmentStorer: AppoinmentStorer = {
      storeAppoinment: jest
        .fn()
        .mockResolvedValue(
          new Appoinment(
            1,
            new Date('2020-10-10 20:20'),
            new Date('2020-10-10 20:30'),
            new Date('2020-09-02 14:23:12'),
            new Date('2020-09-28 14:23:12')
          )
        ),
    }
    const appoinmentController = new AppoinmentController(appoinmentStorer)
    await appoinmentController.createAppoinment(req, res, next)

    expect(next).toBeCalledTimes(0)
    expect(appoinmentStorer.storeAppoinment).toBeCalledTimes(1)
    expect(appoinmentStorer.storeAppoinment).toBeCalledWith(
      new Appoinment(
        1,
        new Date('2020-10-10 20:20'),
        new Date('2020-10-10 20:30'),
        new Date('2020-09-02 14:23:12'),
        new Date('2020-09-28 14:23:12')
      )
    )
    expect(res.status).toBeCalledTimes(1)
    expect(res.status).toBeCalledWith(201)
    expect(res.json).toBeCalledWith({
      appoinments: [
        new Appoinment(
          1,
          new Date('2020-10-10 20:20'),
          new Date('2020-10-10 20:30'),
          new Date('2020-09-02 14:23:12'),
          new Date('2020-09-28 14:23:12')
        ),
      ],
    })
  })
})