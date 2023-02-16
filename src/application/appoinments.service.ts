import { injectable } from 'inversify'
import AppoinmentRepository from './appoinments.repository'

@injectable()
export default class AppoinmentService {
  constructor(private readonly appoinmentRepository: AppoinmentRepository) {}
}
