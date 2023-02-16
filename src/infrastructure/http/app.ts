import { errorHandler } from './middlewares/ErrorHandler'
import express from 'express'
import { Route } from 'src/adapters/IRoute'

export class Application {
  private expressApplication: express.Application = express()

  constructor(private routeList: Route[]) {
    this.routeList.forEach((route) => route.mountRoute(this.expressApplication))
    this.expressApplication.use(errorHandler)
  }

  getExpressApplication(): express.Application {
    return this.expressApplication
  }
}
