const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BangDau', {
    MaBD: {
      type: DataTypes.CHAR(5),
      allowNull: false,
      primaryKey: true
    },
    TenBD: {
      type: DataTypes.STRING(30),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'BangDau',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "PK__BangDau__272475A703317E3D",
        unique: true,
        fields: [
          { name: "MaBD" },
        ]
      },
    ]
  });
};
