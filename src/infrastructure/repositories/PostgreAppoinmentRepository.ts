import { Appoinment } from '@Domain/models/Appointment'
import { AppoinmentRepository } from 'src/services/AppoinmentRepository'

export class PostgreAppoinmentRepository implements AppoinmentRepository {
  createOne(): Promise<Appoinment> {
    throw new Error('Method not implemented.')
  }
}
