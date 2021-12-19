const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BanThang', {
    MaBT: {
      type: DataTypes.CHAR(5),
      allowNull: false
    },
    MaCT: {
      type: DataTypes.CHAR(5),
      allowNull: true,
      references: {
        model: 'CauThu',
        key: 'MaCT'
      }
    },
    MaTD: {
      type: DataTypes.CHAR(5),
      allowNull: true,
      references: {
        model: 'TranDau',
        key: 'MaTD'
      }
    },
    TGianGhiBan: {
      type: DataTypes.TIME,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'BanThang',
    schema: 'public',
    timestamps: false
  });
};
