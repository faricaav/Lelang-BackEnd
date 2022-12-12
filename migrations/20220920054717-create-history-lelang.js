'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('history_lelang', {
      id_history: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_lelang: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "lelang",
          key: "id_lelang"
        }
      },
      id_barang: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "barang",
          key: "id_barang"
        }
      },
      id_masyarakat: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "masyarakat",
          key: "id_masyarakat"
        }
      },
      penawaran_harga: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('history_lelang');
  }
};