import { Appoinment } from '@Domain/models/Appointment'
import { AppoinmentRepository } from './AppoinmentRepository'
import { IAppoinmentStorer } from './IAppoinmentStorer'

export class AppoinmentStorer implements IAppoinmentStorer {
  constructor(private appoinmentRepository: AppoinmentRepository) {}

  async storeAppoinment(appoinment: Appoinment): Promise<Appoinment> {
    // Must check if appinment not exist
    // Must return error if time range not available
    // Update the previos appoinment data if the same ID is recived with updated information
    await this.appoinmentRepository.store(appoinment)
    return appoinment
  }
}
