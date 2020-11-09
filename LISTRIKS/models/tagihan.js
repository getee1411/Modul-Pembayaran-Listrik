'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tagihan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.penggunaan, {
        foreignKey:"id_penggunaan",
        as:"penggunaan"
      })
    }
  };
  tagihan.init({
    id_penggunaan: DataTypes.INTEGER,
    bulan: DataTypes.STRING,
    tahun: DataTypes.STRING,
    jumlah_meter: DataTypes.FLOAT,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tagihan',
    tableName:"tagihan"
  });
  return tagihan;
};