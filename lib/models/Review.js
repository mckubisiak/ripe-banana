import { Sequelize } from 'sequelize';
import database from '../utils/database.js';

const { DataTypes, Model } = Sequelize;

class Review extends Model {}

Review.init(
  {
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0, 
      validate: {
        min: 1,
        max: 5
      }
    },
    review: {
      type: DataTypes.TEXT(140),
      allowNull: false,
    }
  },
  {
    sequelize: database,
    timestamps: false
  }
);

export default Review;
