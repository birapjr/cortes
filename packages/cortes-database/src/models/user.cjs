/* eslint-disable-next-line func-names */
module.exports = function(sequelize, DataTypes) {
  const user = sequelize.define(
    'user',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      data: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {
      tableName: 'w_user'
    }
  );
  return user;
};
