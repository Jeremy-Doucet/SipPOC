'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OpenSession extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OpenSession.init({
    sessionId: DataTypes.TEXT,
    token: DataTypes.TEXT,
    pid: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OpenSession',
  });
  return OpenSession;
};