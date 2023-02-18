import { Appoinment } from '@Domain/models/Appointment'
import AppoinmentModel from '@Infra/repositories/AppoinmentModel'
import { PostgreAppoinmentRepository } from '@Infra/repositories/PostgreAppoinmentRepository'

describe('PostgreAppoinmentRepository tests', () => {
  it('should store a appoinment to database', async () => {
    AppoinmentModel.create = jest.fn()

    const postgreAppoinmentRepository = new PostgreAppoinmentRepository()
    const appoinment = new Appoinment(
      1,
      new Date('2020-10-10 20:20'),
      new Date('2020-10-10 20:30'),
      new Date('2020-09-02 14:23:12'),
      new Date('2020-09-28 14:23:12')
    )
    await postgreAppoinmentRepository.store(appoinment)
    expect(AppoinmentModel.create).toBeCalledTimes(1)
    expect(AppoinmentModel.create).toBeCalledWith(appoinment)
  })

  it('should return null object when the appoinment is not found', async () => {
    AppoinmentModel.findOne = jest.fn().mockResolvedValue(null)

    const postgreAppoinmentRepository = new PostgreAppoinmentRepository()

    expect(await postgreAppoinmentRepository.retriveOneById(1)).toBe(null)
  })

  it('should retrive a appoinment when it is found', async () => {
    AppoinmentModel.findOne = jest
      .fn()
      .mockResolvedValue(
        new Appoinment(
          1,
          new Date('2020-10-10 20:20'),
          new Date('2020-10-10 20:30'),
          new Date('2020-09-02 14:23:12'),
          new Date('2020-09-28 14:23:12')
        )
      )

    const postgreAppoinmentRepository = new PostgreAppoinmentRepository()

    expect(await postgreAppoinmentRepository.retriveOneById(1)).toStrictEqual(
      new Appoinment(
        1,
        new Date('2020-10-10 20:20'),
        new Date('2020-10-10 20:30'),
        new Date('2020-09-02 14:23:12'),
        new Date('2020-09-28 14:23:12')
      )
    )
  })
})
