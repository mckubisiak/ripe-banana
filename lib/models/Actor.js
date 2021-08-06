import { Sequelize } from 'sequelize';
import database from '../utils/database.js';

const { DataTypes, Model } = Sequelize;

class Actor extends Model {}

Actor.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATE,
    },
    pob: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: database,
    timestamps: false,
  }
);

export default Actor;
