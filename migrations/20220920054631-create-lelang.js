'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('lelang', {
      id_lelang: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_barang: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "barang",
          key: "id_barang"
        }
      },
      tgl_lelang: {
        type: Sequelize.DATE
      },
      harga_akhir: {
        type: Sequelize.INTEGER
      },
      id_petugas: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "petugas",
          key: "id_petugas"
        }
      },
      status: {
        type: Sequelize.ENUM("Buka","Tutup")
      },
      id_masyarakat: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "masyarakat",
          key: "id_masyarakat"
        }
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
    await queryInterface.dropTable('lelang');
  }
};