import { Application } from 'express'
import { Route } from 'src/adapters/IRoute'
import { AppoinmentController } from './AppoinmentController'

export class AppoinmentCreateRoute implements Route {
  constructor(private appoinmentController: AppoinmentController) {}
  mountRoute(application: Application): void {
    application
      .route('/api/v1/appoinments')
      .post(this.appoinmentController.createAppoinment)
  }
}
