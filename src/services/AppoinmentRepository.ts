import { Appoinment } from '@Domain/models/Appointment'

export interface AppoinmentRepository {
  createOne(): Promise<Appoinment>
  // modifyOne(): Promise<Appoinment>;
  // findAll(): Promise<Appoinment>;
}
