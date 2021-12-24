const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('GiaiDau', {
    MaGD: {
      type: DataTypes.CHAR(5),
      allowNull: false,
      primaryKey: true
    },
    TenGD: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    DoTuoiTGNhoNhat: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    DoTuoiTGLonNhat: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    SoDBThamGia: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    MaNV: {
      type: DataTypes.CHAR(5),
      allowNull: true,
      references: {
        model: 'NhanVien',
        key: 'MaNV'
      }
    },
    HanCuoiDangKy: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'GiaiDau',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "PK__GiaiDau__2725AE817F60ED59",
        unique: true,
        fields: [
          { name: "MaGD" },
        ]
      },
      {
        name: "fki_FK_GiaiDau_NhanVien",
        fields: [
          { name: "MaNV" },
        ]
      },
    ]
  });
};
