import { Appoinment } from '@Domain/models/Appointment'
import AppoinmentModel from '@Infra/repositories/AppoinmentModel'
import { AppoinmentRepository } from '@Services/AppoinmentRepository'
import { AppoinmentStorer } from '@Services/AppoinmentStorer'

describe('IAppoinmentStorer Tests', () => {
  it('should store appoinment in the repository and return appoinment', async () => {
    const appoinmentRepository: AppoinmentRepository = {
      store: jest.fn(),
      retriveOneById: jest.fn(),
      retriveOneByDates: jest.fn(),
      updateOneById: jest.fn(),
      retriveAll: jest.fn(),
    }
    const appoinmentStorer = new AppoinmentStorer(appoinmentRepository)
    const appoinment = new Appoinment(
      1,
      new Date('2020-10-10 20:20'),
      new Date('2020-10-10 20:30'),
      new Date('2020-09-02 14:23:12'),
      new Date('2020-09-28 14:23:12')
    )
    expect(await appoinmentStorer.storeAppoinment(appoinment)).toEqual(
      appoinment
    )
    expect(appoinmentRepository.store).toBeCalledTimes(1)
    expect(appoinmentRepository.store).toBeCalledWith(appoinment)
  })
})
