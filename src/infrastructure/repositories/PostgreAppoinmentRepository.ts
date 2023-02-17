import { Appoinment } from '@Domain/models/Appointment'
import { AppoinmentRepository } from 'src/services/AppoinmentRepository'
import AppoinmentModel from './AppoinmentModel'

export class PostgreAppoinmentRepository implements AppoinmentRepository {
  async store(appoinment: Appoinment): Promise<void> {
    await AppoinmentModel.create({
      start: appoinment.getStart(),
      end: appoinment.getEnd(),
      id: appoinment.getId(),
      createdAt: appoinment.getCreatedAt(),
      updatedAt: appoinment.getUpdatedAt(),
    })
  }
}
