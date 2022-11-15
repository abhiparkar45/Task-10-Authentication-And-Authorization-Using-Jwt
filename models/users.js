"use strict";
const config = require("config");
const jwt = require("jsonwebtoken");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    //  instanceMethod() {
    //   console.log("This is an instance method log");
    // }
    static associate(models) {
      // define association here
    }
  }
  Users.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Users",
      // hooks: {
      //   afterCreate(user, options) {
      //     const token = jwt.sign({ id: this.id }, config.get('jwtPrivateKey'));
      //   }
      // }
    }
  );
  // Users.generateAuthToken = function(){
  //   const token = jwt.sign({ id: this.id }, config.get('jwtPrivateKey'));
  //   return token;
  // }
  Users.generateAuthToken = (id, email, isAdmin) => {
    const token = jwt.sign({ id, email, isAdmin }, config.get("jwtPrivateKey"));
    return token;
  };

  return Users;
};
