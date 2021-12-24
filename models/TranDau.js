const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TranDau', {
    MaTD: {
      type: DataTypes.CHAR(5),
      allowNull: false,
      primaryKey: true
    },
    MaDB1: {
      type: DataTypes.CHAR(5),
      allowNull: true,
      references: {
        model: 'DoiBong',
        key: 'MaDB'
      }
    },
    MaDB2: {
      type: DataTypes.CHAR(5),
      allowNull: true,
      references: {
        model: 'DoiBong',
        key: 'MaDB'
      }
    },
    MaVD: {
      type: DataTypes.CHAR(5),
      allowNull: true,
      references: {
        model: 'VongDau',
        key: 'MaVD'
      }
    },
    MaSD: {
      type: DataTypes.CHAR(5),
      allowNull: true,
      references: {
        model: 'SanDau',
        key: 'MaSD'
      }
    },
    GioBatDau: {
      type: DataTypes.TIME,
      allowNull: true
    },
    NgThiDau: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    DoiThang: {
      type: DataTypes.CHAR(5),
      allowNull: true,
      references: {
        model: 'DoiBong',
        key: 'MaDB'
      }
    },
    SoBanThangDB1: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    SoBanThangDB2: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'TranDau',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "PK__TranDau__272500691A14E395",
        unique: true,
        fields: [
          { name: "MaTD" },
        ]
      },
    ]
  });
};
