import { errorHandler } from './middlewares/ErrorHandler'
import express from 'express'
import { Route } from 'src/adapters/IRoute'
import morgan from 'morgan'

export class Application {
  private expressApplication: express.Application = express()

  constructor(private routeList: Route[]) {
    this.expressApplication.use(morgan('dev'))
    this.appConfiguration()
    this.mountRoute()
  }

  private mountRoute() {
    this.routeList.forEach((route) => route.mountRoute(this.expressApplication))
    this.expressApplication.use(errorHandler)
  }

  private appConfiguration() {
    this.expressApplication.use(express.json())
    this.expressApplication.use(express.urlencoded({ extended: true }))
  }

  getExpressApplication(): express.Application {
    this.expressApplication.listen(3000, () => {
      console.log('App start on port 3000')
    })
    return this.expressApplication
  }
}
