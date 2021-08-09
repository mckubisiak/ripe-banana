import { Sequelize } from 'sequelize';
import database from '../utils/database.js';

const { DataTypes, Model } = Sequelize;

class Review extends Model {}

Review.init(
  {
    rating: {
      type: DataTypes.RANGE(Sequelize.INTEGER(1, 5)),
      allowNull: false,
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
