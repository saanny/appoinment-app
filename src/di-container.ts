import AppoinmentRepository from '@Application/appoinments.repository'
import AppoinmentService from '@Application/appoinments.service'
import { Container } from 'inversify'

export const container = new Container({
  defaultScope: 'Singleton',
})

container.bind(AppoinmentService).toSelf()
container.bind(AppoinmentRepository).toSelf()
