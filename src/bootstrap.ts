import dotenv from 'dotenv'
import { Application } from './infrastructure/http/app'
import { Route } from './adapters/IRoute'
import dbInit from './infrastructure/drivers/sequlize/init'
import { AppoinmentController } from '@Application/AppoinmentController'
import { AppoinmentCreateRoute } from '@Application/AppoinmentCreateRoute'
import { IAppoinmentStorer } from './services/IAppoinmentStorer'
import { Appoinment } from '@Domain/models/Appointment'
import { AppoinmentStorer } from './services/AppoinmentStorer'
import { PostgreAppoinmentRepository } from '@Infra/repositories/PostgreAppoinmentRepository'

dotenv.config()
dbInit()

const appoinmentRepository = new PostgreAppoinmentRepository()
const appoinmentStorer: IAppoinmentStorer = new AppoinmentStorer(
  appoinmentRepository
)

const appoinmentController = new AppoinmentController(appoinmentStorer)
const appoinmentCreateRoute = new AppoinmentCreateRoute(appoinmentController)

const routeList: Route[] = []
routeList.push(appoinmentCreateRoute)

const application = new Application(routeList)
const expressApplication = application.getExpressApplication()

export default expressApplication
