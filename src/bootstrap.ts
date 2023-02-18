import dotenv from 'dotenv'
import { Application } from './infrastructure/http/app'
import { Route } from './adapters/IRoute'
import dbInit from './infrastructure/drivers/sequlize/init'
import { AppoinmentStorerController } from '@Application/AppoinmentStorerController'
import { AppoinmentStorerRoute } from '@Application/AppoinmentStorerRoute'
import { IAppoinmentStorer } from './services/IAppoinmentStorer'
import { AppoinmentStorer } from './services/AppoinmentStorer'
import { PostgreAppoinmentRepository } from '@Infra/repositories/PostgreAppoinmentRepository'

dotenv.config()
dbInit()

const appoinmentRepository = new PostgreAppoinmentRepository()
const appoinmentStorer: IAppoinmentStorer = new AppoinmentStorer(
  appoinmentRepository
)

const appoinmentController = new AppoinmentStorerController(appoinmentStorer)
const appoinmentStorerRoute = new AppoinmentStorerRoute(appoinmentController)

const routeList: Route[] = []
routeList.push(appoinmentStorerRoute)

const application = new Application(routeList)
const expressApplication = application.getExpressApplication()

export default expressApplication
