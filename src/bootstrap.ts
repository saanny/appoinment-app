import dotenv from 'dotenv'
import { Application } from './infrastructure/http/app'
import { Route } from './adapters/IRoute'
import dbInit from './infrastructure/drivers/sequlize/init'
import { AppoinmentStorerController } from '@Application/AppoinmentStorerController'
import { AppoinmentStorerRoute } from '@Application/AppoinmentStorerRoute'
import { IAppoinmentStorer } from './services/IAppoinmentStorer'
import { AppoinmentStorer } from './services/AppoinmentStorer'
import { PostgreAppoinmentRepository } from '@Infra/repositories/PostgreAppoinmentRepository'
import { AppoinmentRetriverController } from '@Application/AppoinmentRetriverController'
import { IAppoinmentRetriver } from '@Services/IAppoinmentRetriver'
import { AppoinmentRetriver } from '@Services/AppoinmentRetriver'
import { AppoinmentRetriverRoute } from '@Application/AppoinmentRetriverRoute'

dotenv.config()
dbInit()

const appoinmentRepository = new PostgreAppoinmentRepository()
const appoinmentStorer: IAppoinmentStorer = new AppoinmentStorer(
  appoinmentRepository
)
const appoinmentRetriver: IAppoinmentRetriver = new AppoinmentRetriver(
  appoinmentRepository
)
const appoinmentStorerController = new AppoinmentStorerController(
  appoinmentStorer
)
const appoinmentStorerRoute = new AppoinmentStorerRoute(
  appoinmentStorerController
)

const appoinmentRetriverController = new AppoinmentRetriverController(
  appoinmentRetriver
)
const appoinmentRetriverRoute = new AppoinmentRetriverRoute(
  appoinmentRetriverController
)

const routeList: Route[] = []
routeList.push(appoinmentStorerRoute)
routeList.push(appoinmentRetriverRoute)

const application = new Application(routeList)
const expressApplication = application.getExpressApplication()

export default expressApplication
