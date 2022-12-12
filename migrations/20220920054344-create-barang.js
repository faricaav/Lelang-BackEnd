'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('barang', {
      id_barang: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama_barang: {
        type: Sequelize.STRING
      },
      tgl_daftar: {
        type: Sequelize.DATE
      },
      harga_awal: {
        type: Sequelize.INTEGER
      },
      deskripsi: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      createdAt: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP()'),
        allowNull: false
      },
      updatedAt: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP()'),
        allowNull: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('barang');
  }
};