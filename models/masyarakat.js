'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class masyarakat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.lelang,{
        foreignKey: "id_masyarakat",
        as: "lelang masyarakat"
      })
      this.hasMany(models.history_lelang,{
        foreignKey: "id_masyarakat",
        as: "history masyarakat"
      })
    }
  }
  masyarakat.init({
    id_masyarakat: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nama: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    tlp: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'masyarakat',
    tableName: 'masyarakat',
  });
  return masyarakat;
};