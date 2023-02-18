import expressApplication from '../../bootstrap'
import supertest from 'supertest'
import AppoinmentModel from '@Infra/repositories/AppoinmentModel'

const request = supertest(expressApplication)
describe('store appoinment integration tests', () => {
  afterAll(async () => {
    await AppoinmentModel.destroy({
      where: {},
      truncate: true,
    })
  })
  it('should return an error if the body dose not have id', async () => {
    const response = await request.post('/api/v1/appointments').send({
      start: '2018-10-02 16:23:12',
      createdAt: '2020-09-02 14:23:12',
      updatedAt: '2020-09-28 14:23:12',
    })

    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      name: 'RequestValidationError',
      message: 'Id is not provided',
    })
  })

  it('should return an error if the body dose not have end date', async () => {
    const response = await request.post('/api/v1/appointments').send({
      id: 1,
      start: '2018-10-02 16:23:12',
      createdAt: '2020-09-02 14:23:12',
      updatedAt: '2020-09-28 14:23:12',
    })

    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      name: 'RequestValidationError',
      message: 'Start or end date is not provided',
    })
  })

  it('should return an error if the body dose not have start date', async () => {
    const response = await request.post('/api/v1/appointments').send({
      id: 1,
      end: new Date(),
      createdAt: '2020-09-02 14:23:12',
      updatedAt: '2020-09-28 14:23:12',
    })

    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      name: 'RequestValidationError',
      message: 'Start or end date is not provided',
    })
  })

  it('should return an error if the body dose not have createdAt date', async () => {
    const response = await request.post('/api/v1/appointments').send({
      id: 1,
      start: '2018-10-02 16:23:12',
      end: new Date(),
      updatedAt: '2020-09-28 14:23:12',
    })

    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      name: 'RequestValidationError',
      message: 'CreatedAt or updatedAt is not provided',
    })
  })

  it('should return an error if the body dose not have updatedAt date', async () => {
    const response = await request.post('/api/v1/appointments').send({
      id: 1,
      start: '2020-09-02 14:23:12',
      end: new Date(),
      createdAt: '2020-09-02 14:23:12',
    })

    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      name: 'RequestValidationError',
      message: 'CreatedAt or updatedAt is not provided',
    })
  })

  it('should return an error if start date or end date not Date', async () => {
    const response = await request.post('/api/v1/appointments').send({
      id: 1,
      start: '2018-10-02 16:23:12',
      end: 'somesiliystring',
      createdAt: '2020-09-02 14:23:12',
      updatedAt: '2020-09-28 14:23:12',
    })

    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      name: 'RequestValidationError',
      message: 'Please provide valid format for start or end date fields',
    })
  })

  it('should return an error if createdAt or updatedAt was not Date', async () => {
    const response = await request.post('/api/v1/appointments').send({
      id: 1,
      start: '2018-10-02 16:23:12',
      end: '2018-10-02 17:23:12',
      createdAt: 'sadgasdasd',
      updatedAt: '2020-09-28 14:23:12',
    })

    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      name: 'RequestValidationError',
      message:
        'Please provide valid format for createdAt or updatedAt date fields',
    })
  })

  it('should return an error if start and end date was the same ', async () => {
    const response = await request.post('/api/v1/appointments').send({
      id: 1,
      start: '2018-10-02 16:23:12',
      end: '2018-10-02 16:23:12',
      createdAt: '2020-09-02 14:23:12',
      updatedAt: '2020-09-28 14:23:12',
    })

    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      name: 'AppoinmentValidationError',
      message: 'The start date and end date it should not be the same',
    })
  })

  it('should store appoinment and return appoinment ', async () => {
    const response = await request.post('/api/v1/appointments').send({
      id: 1,
      start: '2020-10-17 14:40',
      end: '2020-10-17 15:30',
      createdAt: '2020-03-02 19:23:12',
      updatedAt: '2020-09-28 14:24:12',
    })

    expect(response.status).toBe(201)
  })
})
