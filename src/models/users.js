const bcrypt = require("bcryptjs/dist/bcrypt")

module.exports = (sequelize, DataTypes) => {
  const UserModel = sequelize.define("user", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    first_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
  }, {
    tableName: "inventory_user",
    timestamps: false
  })


  return UserModel
}

