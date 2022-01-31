const bcrypt = require('bcrypt');
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Must be a valid email address',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6],
          msg: 'Minimum 6 characters required in last name',
        },
      },
    },
  };

  const options = {
    indexes: [
      {
        fields: ['email'],
        unique: true,
      },
    ],
    // exclude password in output response
    defaultScope: {
      attributes: { exclude: ['password'] },
    },
    // scope to include password
    scopes: {
      withPassword: {
        attributes: { include: ['password'] },
      },
    },

    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10, 'a');
          user.password = bcrypt.hashSync(user.password, salt);
        }
      },
      // beforeUpdate: hashPassword(user),
      beforeUpdate: async (user) => {
        // if field is empty, not update it
        if (!user.changed('password')) return null;
        if (user.password) {
          const salt = await bcrypt.genSalt(10, 'a');
          user.password = bcrypt.hashSync(user.password, salt);
        }
      },
    },
    instanceMethods: {
      validPassword: (password) => {
        return bcrypt.compareSync(password, this.password);
      },
    },
  };

  const userSchema = sequelize.define('User', attributes, options);

  userSchema.prototype.validPassword = async (password, hash) => {
    return await bcrypt.compareSync(password, hash);
  };

  // toJSON se llama cuando los datos se devuelven al usuario
  // userSchema.prototype.toJSON = () => {
  //   // con Object.assign clonamos el objeto devuelto sino modificariamos la instancia
  //   var values = Object.assign({}, this.get());
  //   delete values.password;
  //   return values;
  // };

  // function hashPassword(user) {
  //   const password = user.password || user.attributes.password;
  //   if (!user.changed('password')) return null;

  //   return bcrypt.genSaltAsync(5).then((salt) =>
  //     bcrypt.hashAsync(password, salt, null).then((hash) => {
  //       user.password = hash; // eslint-disable-line
  //     })
  //   );
  // }

  // Check if email is taken
  // userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  //   const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  //   return !!user;
  // };

  // Check if password matches the user's password
  // userSchema.methods.isPasswordMatch = async function (password) {
  //   const user = this;
  //   return bcrypt.compare(password, user.password);
  // };

  /*
  userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, 8);
    }
    next();
  });
  */

  // User.associate = function (models) {
  //   // associations can be defined here
  // };

  return userSchema;
}

module.exports = model;
