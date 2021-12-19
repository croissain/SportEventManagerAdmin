const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('DoiBong', {
    MaDB: {
      type: DataTypes.CHAR(5),
      allowNull: false,
      primaryKey: true
    },
    TenDB: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    SoThanhVien: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    MauAo: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Diem: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    MaNDK: {
      type: DataTypes.CHAR(5),
      allowNull: true,
      references: {
        model: 'NguoiDangKy',
        key: 'MaNDK'
      }
    },
    MaGD: {
      type: DataTypes.CHAR(5),
      allowNull: true,
      references: {
        model: 'GiaiDau',
        key: 'MaGD'
      }
    },
    MaBD: {
      type: DataTypes.CHAR(5),
      allowNull: true,
      references: {
        model: 'BangDau',
        key: 'MaBD'
      }
    }
  }, {
    sequelize,
    tableName: 'DoiBong',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "PK__DoiBong__2725867B164452B1",
        unique: true,
        fields: [
          { name: "MaDB" },
        ]
      },
    ]
  });
};
