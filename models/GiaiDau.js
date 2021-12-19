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
    }
  }, {
    sequelize,
    tableName: 'GiaiDau',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "PK__GiaiDau__2725AE8103317E3D",
        unique: true,
        fields: [
          { name: "MaGD" },
        ]
      },
    ]
  });
};
