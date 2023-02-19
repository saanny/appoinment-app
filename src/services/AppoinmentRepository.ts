import { Appoinment } from '@Domain/models/Appointment'

export interface AppoinmentRepository {
  store(appoinment: Appoinment): Promise<void>
  retriveOneById(id: number): Promise<Appoinment | null>
  retriveOneByDates(start: Date, end: Date): Promise<Appoinment | null>
  retriveAll(query: string): Promise<Array<Appoinment> | []>
  updateOneById(id: number, appoinment: Appoinment): Promise<Appoinment | null>
}
