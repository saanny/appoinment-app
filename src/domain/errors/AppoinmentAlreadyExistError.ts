export class AppoinmentAlreadyExistError extends Error {
  constructor() {
    super('Appoinment Already Exist')
    this.name = 'AppoinmentAlreadyExistError'
  }
}
