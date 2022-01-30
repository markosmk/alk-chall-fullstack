const { DataTypes } = require('sequelize');

function model(sequelize) {
  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    concept: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('ingreso', 'egreso'),
      allowNull: false,
    },
    // Relation handle in ApplyExtraOptions,
    // userId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     // Operations belongsTo one User
    //     model: 'Users',
    //     key: 'id',
    //   },
    // },
    // categoryId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     // Operation belongsTo one Category
    //     model: 'Users',
    //     key: 'id',
    //   },
    // },
  };

  const options = {};

  return sequelize.define('Operation', attributes, options);
}

module.exports = model;
