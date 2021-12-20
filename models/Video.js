const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Video', {
    MaVideo: {
      type: DataTypes.CHAR(5),
      allowNull: false,
      primaryKey: true
    },
    Link: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Video',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "Video_pkey",
        unique: true,
        fields: [
          { name: "MaVideo" },
        ]
      },
    ]
  });
};
