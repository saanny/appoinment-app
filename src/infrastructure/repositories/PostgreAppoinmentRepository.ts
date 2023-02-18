import { Appoinment } from '@Domain/models/Appointment'
import { AppoinmentRepository } from 'src/services/AppoinmentRepository'
import AppoinmentModel from './AppoinmentModel'

export class PostgreAppoinmentRepository implements AppoinmentRepository {
  async retriveOneById(id: number): Promise<Appoinment | null> {
    const result = await AppoinmentModel.findOne({
      where: { id },
    })

    if (!result) return null

    const appoinment = new Appoinment(
      result.id,
      new Date(result.start),
      new Date(result.end),
      new Date(result.createdAt),
      new Date(result.updatedAt)
    )

    return appoinment
  }
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
