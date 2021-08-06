import { Sequelize } from 'sequelize';
import database from '../utils/database.js';

const { DataTypes, Model } = Sequelize;

class Studio extends Model {}

Studio.init(
  {
    name: {
      type: DataTypes.STRING
      // allowNull: false,
    },
    city: {
      type: DataTypes.STRING
    },
    state: {
      type: DataTypes.STRING
    },
    country: {
      type: DataTypes.STRING
    },
  },
  {
    sequelize: database,
    timestamps: false
  }

);

export default Studio;
