import { Application } from 'express'
import { Route } from 'src/adapters/IRoute'
import { AppoinmentCreateOrModifyController } from './AppoinmentCreateOrModifyController'

export class AppoinmentCreateOrModifyRoute implements Route {
  constructor(
    private appoinmentController: AppoinmentCreateOrModifyController
  ) {}
  mountRoute(application: Application): void {
    application
      .route('/api/v1/appoinment')
      .post(this.appoinmentController.createOrModify)
  }
}
