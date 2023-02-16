import 'reflect-metadata'
import dotenv from 'dotenv'
import App from './infrastructure/http/app'
import './application/appointments.controller'

dotenv.config()

export async function bootstrap() {
  const port = 8000
  const application = new App(port)
  application.start()
}

bootstrap()
