import { Sequelize } from 'sequelize';
import database from '../utils/database.js';

const { DataTypes, Model } = Sequelize;

class Film extends Model {}

Film.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // studio: {
    //   type: DataTypes.BIGINT,
    //   allowNull: false
    // },
    released: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    // cast: {
    //   type: DataTypes.STRING,
    //   allowNull: false
    // },
  },
  {
    sequelize: database,
    timestamps: false,
  }
);

export default Film;
