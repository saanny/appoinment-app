import { Appoinment } from '@Domain/models/Appointment'

export interface IAppoinmentRetriver {
  retriveAppoinments(
    start?: string,
    end?: string
  ): Promise<Array<Appoinment> | []>
}
