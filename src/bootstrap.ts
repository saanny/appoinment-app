import dotenv from 'dotenv'
import { Application } from './infrastructure/http/app'
import { Route } from './adapters/IRoute'
import { AppoinmentCreateOrModifyController } from '@Application/AppoinmentCreateOrModifyController'
import { AppoinmentCreateOrModifyRoute } from '@Application/AppoinmentCreateOrModifyRoute'

dotenv.config()

export async function bootstrap() {
  const appoinmentCreateOrModifyController =
    new AppoinmentCreateOrModifyController()
  const appoinmentCreateOrModifyRoute = new AppoinmentCreateOrModifyRoute(
    appoinmentCreateOrModifyController
  )

  const routeList: Route[] = []
  routeList.push(appoinmentCreateOrModifyRoute)

  const application = new Application(routeList)
  application.getExpressApplication()
}

bootstrap()
