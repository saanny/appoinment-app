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
})
