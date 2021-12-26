const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('NhanVien', {
    MaNV: {
      type: DataTypes.CHAR(5),
      allowNull: false,
      primaryKey: true
    },
    TenNV: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    SDT_NV: {
      type: DataTypes.CHAR(10),
      allowNull: true
    },
    EmailNV: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    AnhNV: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    MatKhauNV: {
      type: DataTypes.STRING(200),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'NhanVien',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "NhanVien_pkey",
        unique: true,
        fields: [
          { name: "MaNV" },
        ]
      },
    ]
  });
};
