import { Appoinment } from '@Domain/models/Appointment'

export interface AppoinmentRepository {
  store(appoinment: Appoinment): Promise<void>
  retriveOneById(id: number): Promise<Appoinment | null>
  retriveOneByDates(start: Date, end: Date): Promise<Appoinment | null>
  updateOneById(id: number, appoinment: Appoinment): Promise<Appoinment | null>
}
