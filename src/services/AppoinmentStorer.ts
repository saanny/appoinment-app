import { Appoinment } from '@Domain/models/Appointment'
import { AppoinmentRepository } from './AppoinmentRepository'
import { IAppoinmentStorer } from './IAppoinmentStorer'
import { AppoinmentValidationError } from '@Domain/errors/AppoinmentValidationError'
export class AppoinmentStorer implements IAppoinmentStorer {
  constructor(private appoinmentRepository: AppoinmentRepository) {}

  async storeAppoinment(appoinment: Appoinment): Promise<Appoinment> {
    // must write test for this senario

    const appoinmentTimeRangeExist =
      await this.appoinmentRepository.retriveOneByDates(
        appoinment.getStart(),
        appoinment.getEnd()
      )

    if (appoinmentTimeRangeExist) {
      throw new AppoinmentValidationError(
        'The time range for this appoinment is not available'
      )
    }

    const appoinmentExist = await this.appoinmentRepository.retriveOneById(
      appoinment.getId()
    )

    if (!appoinmentExist) {
      await this.appoinmentRepository.store(appoinment)
    } else {
      await this.appoinmentRepository.updateOneById(
        appoinment.getId(),
        appoinment
      )
    }

    return appoinment
  }
}
