const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BanThang', {
    MaBT: {
      type: DataTypes.CHAR(5),
      allowNull: false,
      primaryKey: true
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
    timestamps: false,
    indexes: [
      {
        name: "PK__BanThang__2724759721B6055D",
        unique: true,
        fields: [
          { name: "MaBT" },
        ]
      },
    ]
  });
};
