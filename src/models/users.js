module.exports = (sequelize, DataTypes) => {
  const UserModel = sequelize.define("user", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
  }, {
    tableName: "user",
    timestamps: false
  })
  return UserModel
}