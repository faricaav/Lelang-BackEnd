'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class history_lelang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.barang,{
        foreignKey: "id_barang",
        as: "barang"
      })
      this.belongsTo(models.masyarakat,{
        foreignKey: "id_masyarakat",
        as: "masyarakat"
      })
      this.belongsTo(models.lelang,{
        foreignKey: "id_lelang",
        as: "lelang"
      })
    }
  }
  history_lelang.init({
    id_history: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_lelang: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_barang: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_masyarakat: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    penawaran_harga: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'history_lelang',
    tableName: 'history_lelang',
  });
  return history_lelang;
};