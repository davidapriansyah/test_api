'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Top_up extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Top_up.belongsTo(models.User, {
        foreignKey: "UserId"
      })
    }
  }
  Top_up.init({
    UserId: DataTypes.INTEGER,
    top_up_amount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Top_up',
  });
  return Top_up;
};