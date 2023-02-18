import { Application } from 'express'
import { Route } from 'src/adapters/IRoute'
import { AppoinmentStorerController } from './AppoinmentStorerController'

export class AppoinmentStorerRoute implements Route {
  constructor(private appoinmentStorerController: AppoinmentStorerController) {}
  mountRoute(application: Application): void {
    application
      .route('/api/v1/appointments')
      .post(this.appoinmentStorerController.createAppoinment)
  }
}
