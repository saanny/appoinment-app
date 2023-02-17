import AppoinmentModel from '@Infra/repositories/AppoinmentModel'
import dotenv from 'dotenv'

dotenv.config()

const dbInit = () => {
  AppoinmentModel.sync({
    alter:
      process.env.NODE_ENV === 'development' || process.env.NODE_ENV !== 'test',
  })
}
export default dbInit
