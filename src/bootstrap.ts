import dotenv from 'dotenv'
import { Application } from './infrastructure/http/app'
import { Route } from './adapters/IRoute'
import dbInit from './infrastructure/drivers/sequlize/init'
import { AppoinmentController } from '@Application/AppoinmentController'
import { AppoinmentCreateRoute } from '@Application/AppoinmentCreateRoute'
import { AppoinmentStorer } from './services/AppoinmentStorer'
import { Appoinment } from '@Domain/models/Appointment'

dotenv.config()
dbInit()

const appoinmentStorer: AppoinmentStorer = {
  storeAppoinment: function (appoinment: Appoinment): Promise<Appoinment> {
    throw new Error('Function not implemented.')
  },
}
const appoinmentController = new AppoinmentController(appoinmentStorer)
const appoinmentCreateRoute = new AppoinmentCreateRoute(appoinmentController)

const routeList: Route[] = []
routeList.push(appoinmentCreateRoute)

const application = new Application(routeList)
const expressApplication = application.getExpressApplication()

export default expressApplication
