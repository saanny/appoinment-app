import { Appoinment, IAppoinment } from '@Domain/models/Appointment'
import AppoinmentModel from '@Infra/repositories/AppoinmentModel'
import { Op } from 'sequelize'
import { AppoinmentRepository } from './AppoinmentRepository'
import { IAppoinmentRetriver } from './IAppoinmentRetriver'

export class AppoinmentRetriver implements IAppoinmentRetriver {
  constructor(private appoinmentRepository: AppoinmentRepository) {}

  async retriveAppoinments(
    start?: string | undefined,
    end?: string | undefined
  ): Promise<Appoinment[] | []> {
    //    we can add orderby, limit, offset, ....
    //    should check if start and end must be date
    const query: any = {}

    if (start) {
      query.start = {}
      query.start[Op.gte] = start
    }

    if (end) {
      query.end = {}
      query.end[Op.lte] = end
    }

    const result = await this.appoinmentRepository.retriveAll(query)

    const appointments: Array<Appoinment> = result.map((item: any) => {
      return new Appoinment(
        item.id,
        new Date(item.start),
        new Date(item.end),
        new Date(item.createdAt),
        new Date(item.updatedAt)
      )
    })

    // we can add presenter layer for response
    return appointments.length > 0 ? appointments : []
  }
}
