const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'users',
    timestamps: false,
  });

  const UserUpdate = sequelize.define('UserUpdate', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    field_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    field_value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'userupdates',
    timestamps: false,
  });

  User.hasMany(UserUpdate, { foreignKey: 'user_id' });
  UserUpdate.belongsTo(User, { foreignKey: 'user_id' });

  return { User, UserUpdate };
};