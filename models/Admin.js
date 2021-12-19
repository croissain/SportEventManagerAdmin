const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Admin', {
    Email: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    Password: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    HoTen: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    SDT: {
      type: DataTypes.CHAR(10),
      allowNull: true
    },
    MaAdmin: {
      type: DataTypes.CHAR(5),
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'Admin',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "Admin_pkey",
        unique: true,
        fields: [
          { name: "MaAdmin" },
        ]
      },
    ]
  });
};
