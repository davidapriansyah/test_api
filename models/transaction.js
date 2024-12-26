'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Transaction.init({
    UserId: DataTypes.INTEGER,
    invoice_number: DataTypes.STRING,
    service_code: DataTypes.STRING,
    service_name: DataTypes.STRING,
    transaction_type: DataTypes.STRING,
    total_amount: DataTypes.INTEGER,
    created_on: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};