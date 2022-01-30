const { DataTypes } = require('sequelize');

function model(sequelize) {
  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  };

  const options = {
    timestamps: false,
  };

  return sequelize.define('Category', attributes, options);
}

module.exports = model;
