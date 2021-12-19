const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('NguoiDangKy', {
    MaNDK: {
      type: DataTypes.CHAR(5),
      allowNull: false,
      primaryKey: true
    },
    TenNDK: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    SDT: {
      type: DataTypes.CHAR(10),
      allowNull: true
    },
    Email: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    Password: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'NguoiDangKy',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "PK__NguoiDan__3A1855901273C1CD",
        unique: true,
        fields: [
          { name: "MaNDK" },
        ]
      },
    ]
  });
};
