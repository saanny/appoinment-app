import { Appoinment } from '@Domain/models/Appointment'
import { AppoinmentRepository } from 'src/services/AppoinmentRepository'
import AppoinmentModel from './AppoinmentModel'
import { Sequelize, Op } from 'sequelize'

export class PostgreAppoinmentRepository implements AppoinmentRepository {
  async retriveAll(query: any): Promise<Appoinment[] | []> {
    const result: any = await AppoinmentModel.findAll({
      where: query,
      raw: true,
    })
    return result.length > 0 ? result : []
  }
  async updateOneById(
    id: number,
    appoinment: Appoinment
  ): Promise<Appoinment | null> {
    const result = await AppoinmentModel.update(
      {
        start: appoinment.getStart(),
        end: appoinment.getEnd(),
        id: appoinment.getId(),
        createdAt: appoinment.getCreatedAt(),
        updatedAt: appoinment.getUpdatedAt(),
      },
      {
        where: { id },
      }
    )
    if (!result) return null
    return appoinment
  }
  async retriveOneByDates(start: Date, end: Date): Promise<Appoinment | null> {
    // must check if startdate exist
    // must check if enddate exist

    const result = await AppoinmentModel.findOne({
      where: {
        [Op.or]: [
          Sequelize.where(
            Sequelize.fn('date', Sequelize.col('start')),
            '>=',
            start
          ),
          Sequelize.where(
            Sequelize.fn('date', Sequelize.col('end')),
            '<=',
            end
          ),
        ],
      },
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
