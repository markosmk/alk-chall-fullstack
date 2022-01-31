const applyExtraOptions = (sequelize) => {
  const { User, Operation, Category } = sequelize.models;
  /**
  One-To-Many relation
  */
  // Relation User has many operations
  User.hasMany(Operation, {
    foreignKey: {
      name: 'userId',
      allowNull: false,
    },
  });
  // Relation Operations belongs a one unique User
  Operation.belongsTo(User, {
    foreignKey: {
      name: 'userId',
      allowNull: false,
    },
  });

  // Relation User has many categories
  User.hasMany(Category, {
    foreignKey: {
      name: 'userId',
      allowNull: false,
    },
  });
  // Relation Categories belongs a one unique User
  Category.belongsTo(User, {
    foreignKey: {
      name: 'userId',
      allowNull: false,
    },
  });

  /**
  One-To-One relation
  */
  // Relation Category has many operations
  Category.hasOne(Operation, {
    foreignKey: {
      name: 'categoryId',
    },
  });
  // Relation Operations belongs a one Category
  Operation.belongsTo(Category, {
    foreignKey: {
      name: 'categoryId',
    },
  });
};

module.exports = { applyExtraOptions };
