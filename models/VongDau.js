const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('VongDau', {
    MaVD: {
      type: DataTypes.CHAR(5),
      allowNull: false,
      primaryKey: true
    },
    TenVD: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'VongDau',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "PK__VongDau__2725102E0AD2A005",
        unique: true,
        fields: [
          { name: "MaVD" },
        ]
      },
    ]
  });
};
