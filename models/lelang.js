'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class lelang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.history_lelang,{
        foreignKey: "id_lelang",
        as: "history lelang"
      })
      this.belongsTo(models.barang,{
        foreignKey: "id_barang",
        as: "barang"
      })
      this.belongsTo(models.masyarakat,{
        foreignKey: "id_masyarakat",
        as: "masyarakat"
      })
      this.belongsTo(models.petugas,{
        foreignKey: "id_petugas",
        as: "petugas"
      })
    }
  }
  lelang.init({
    id_lelang: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_barang: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tgl_lelang: DataTypes.DATE,
    harga_akhir: DataTypes.INTEGER,
    id_petugas: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: DataTypes.ENUM("Buka","Tutup"),
    id_masyarakat: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'lelang',
    tableName: 'lelang',
  });
  return lelang;
};