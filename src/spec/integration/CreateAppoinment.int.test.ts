import expressApplication from '../../bootstrap'
import supertest from 'supertest'

const request = supertest(expressApplication)
describe('store appoinment integration tests', () => {
  it('should return an error if the body dose not have id', async () => {
    const response = await request.post('/api/v1/appoinments').send({
      appoinments: [
        {
          start: '2018-10-02 16:23:12',
          createdAt: '2020-09-02 14:23:12',
          updatedAt: '2020-09-28 14:23:12',
        },
      ],
    })

    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      name: 'RequestValidationError',
      message: 'Id is not provided',
    })
  })

  it('should return an error if the body dose not have end date', async () => {
    const response = await request.post('/api/v1/appoinments').send({
      appoinments: [
        {
          id: 1,
          start: '2018-10-02 16:23:12',
          createdAt: '2020-09-02 14:23:12',
          updatedAt: '2020-09-28 14:23:12',
        },
      ],
    })

    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      name: 'RequestValidationError',
      message: 'Start or end date is not provided',
    })
  })

  it('should return an error if the body dose not have start date', async () => {
    const response = await request.post('/api/v1/appoinments').send({
      appoinments: [
        {
          id: 1,
          end: new Date(),
          createdAt: '2020-09-02 14:23:12',
          updatedAt: '2020-09-28 14:23:12',
        },
      ],
    })

    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      name: 'RequestValidationError',
      message: 'Start or end date is not provided',
    })
  })

  it('should return an error if the body dose not have createdAt date', async () => {
    const response = await request.post('/api/v1/appoinments').send({
      appoinments: [
        {
          id: 1,
          start: '2018-10-02 16:23:12',
          end: new Date(),
          updatedAt: '2020-09-28 14:23:12',
        },
      ],
    })

    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      name: 'RequestValidationError',
      message: 'CreatedAt or updatedAt is not provided',
    })
  })

  it('should return an error if the body dose not have updatedAt date', async () => {
    const response = await request.post('/api/v1/appoinments').send({
      appoinments: [
        {
          id: 1,
          start: '2020-09-02 14:23:12',
          end: new Date(),
          createdAt: '2020-09-02 14:23:12',
        },
      ],
    })

    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      name: 'RequestValidationError',
      message: 'CreatedAt or updatedAt is not provided',
    })
  })

  it('should return an error if start date or end date not Date', async () => {
    const response = await request.post('/api/v1/appoinments').send({
      appoinments: [
        {
          id: 1,
          start: '2018-10-02 16:23:12',
          end: 'somesiliystring',
          createdAt: '2020-09-02 14:23:12',
          updatedAt: '2020-09-28 14:23:12',
        },
      ],
    })

    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      name: 'RequestValidationError',
      message: 'Please provide valid format for start or end date fields',
    })
  })

  it('should return an error if createdAt or updatedAt was not Date', async () => {
    const response = await request.post('/api/v1/appoinments').send({
      appoinments: [
        {
          id: 1,
          start: '2018-10-02 16:23:12',
          end: '2018-10-02 17:23:12',
          createdAt: 'sadgasdasd',
          updatedAt: '2020-09-28 14:23:12',
        },
      ],
    })

    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      name: 'RequestValidationError',
      message:
        'Please provide valid format for createdAt or updatedAt date fields',
    })
  })

  it('should return an error if start and end date was the same ', async () => {
    const response = await request.post('/api/v1/appoinments').send({
      appoinments: [
        {
          id: 1,
          start: '2018-10-02 16:23:12',
          end: '2018-10-02 16:23:12',
          createdAt: '2020-09-02 14:23:12',
          updatedAt: '2020-09-28 14:23:12',
        },
      ],
    })

    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      name: 'AppoinmentValidationError',
      message: 'The start date and end date it should not be the same',
    })
  })

  it('should store appoinment and return appoinment ', async () => {
    const response = await request.post('/api/v1/appoinments').send({
      appoinments: [
        {
          id: 1,
          start: '2020-10-10 20:20',
          end: '2020-10-10 20:30',
          createdAt: '2020-09-02 14:23:12',
          updatedAt: '2020-09-28 14:23:12',
        },
        {
          id: 2,
          start: '2019-10-10 20:20',
          end: '2020-10-10 20:30',
          createdAt: '2018-10-02 16:23:12',
          updatedAt: '2020-09-28 14:23:12',
        },
        {
          id: 3,
          start: '2020-10-10 20:25',
          end: '2020-10-10 20:35',
          createdAt: '2020-10-01 13:23:12',
          updatedAt: '2020-09-28 14:23:12',
        },
        {
          id: 4,
          start: '2020-10-11 10:00',
          end: '2020-10-11 11:30',
          createdAt: '2020-10-01 11:23:12',
          updatedAt: '2020-09-28 14:23:12',
        },
        {
          id: 5,
          start: '2020-10-12 11:27',
          end: '2020-10-10 12:27',
          createdAt: '2020-09-11 10:23:12',
          updatedAt: '2020-09-28 14:23:12',
        },
        {
          id: 6,
          start: '2020-10-12 12:00',
          end: '2020-10-12 13:30',
          createdAt: '2020-08-02 13:23:12',
          updatedAt: '2020-09-28 14:23:12',
        },
        // {
        //     id: 1,
        //     start: "2020-10-17 14:40",
        //     end: "2020-10-17 15:30",
        //     createdAt: "2020-03-02 19:23:12",
        //     updatedAt: "2020-09-28 14:24:12"
        // }
      ],
    })

    expect(response.status).toBe(201)
  })
})
