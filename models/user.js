'use strict';
const {
  Model
} = require('sequelize');
const { hash } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Balance, {foreignKey: "userId"})
      User.hasMany(models.Transaction, {foreignKey: "userId"})

    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Email harus unique"
      },
      validate: {
        notNull: {
          msg: "Email harus di isi"
        },
        notEmpty : {
          msg: "Email tidak boleh kosong"
        },
        isEmail: {
          msg: "Paramter email tidak sesuai format"
        }
      }
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password harus di isi"
        },
        notEmpty: {
          msg: "Password tidak boleh kosong"
        },
        len: {
          args: 8,
          msg: "Password minimal 8 karakter"
        }
      }
      },
    profile_image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user) => {
    user.password = hash(user.password)
    user.profile_image = "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
  })
  return User;
};