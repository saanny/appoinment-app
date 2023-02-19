import { Application } from 'express'
import { Route } from 'src/adapters/IRoute'
import { AppoinmentRetriverController } from './AppoinmentRetriverController'

export class AppoinmentRetriverRoute implements Route {
  constructor(
    private appoinmentRetriverController: AppoinmentRetriverController
  ) {}
  mountRoute(application: Application): void {
    application
      .route('/api/v1/appointments')
      .get(this.appoinmentRetriverController.retriveAppointments)
  }
}
