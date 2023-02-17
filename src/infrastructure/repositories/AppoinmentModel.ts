import { Model, Optional, DataTypes } from 'sequelize'
import sequelizeConnection from '../drivers/sequlize/config'

interface IAppoinment {
  id: number
  start: Date
  end: Date
}
export interface IAppoinmentInput extends Optional<IAppoinment, 'id'> {}

export interface IAppoinmentOuput extends Required<IAppoinment> {}

class AppoinmentModel
  extends Model<IAppoinmentOuput, IAppoinmentInput>
  implements IAppoinment
{
  public id!: number
  public start!: Date
  public end!: Date
}
AppoinmentModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    start: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: 'appoinments',
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true,
  }
)
export default AppoinmentModel
