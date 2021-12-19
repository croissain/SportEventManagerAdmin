const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('SanDau', {
    MaSD: {
      type: DataTypes.CHAR(5),
      allowNull: false,
      primaryKey: true
    },
    DiaChi: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'SanDau',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "PK__SanDau__272508080EA330E9",
        unique: true,
        fields: [
          { name: "MaSD" },
        ]
      },
    ]
  });
};
