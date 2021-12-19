const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CauThu', {
    MaCT: {
      type: DataTypes.CHAR(5),
      allowNull: false,
      primaryKey: true
    },
    TenCT: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    MaDB: {
      type: DataTypes.CHAR(5),
      allowNull: true,
      references: {
        model: 'DoiBong',
        key: 'MaDB'
      }
    },
    NgSinhCT: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    ChieuCaoCT: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    CanNangCT: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    TongBT: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    SoAo: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    ViTri: {
      type: DataTypes.STRING(30),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'CauThu',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "PK__CauThu__27258E741A14E395",
        unique: true,
        fields: [
          { name: "MaCT" },
        ]
      },
    ]
  });
};
