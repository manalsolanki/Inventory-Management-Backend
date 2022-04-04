const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();
const User = require("./users")
const Item = require("./items")
const PurchasedItem = require("./purchasedItems")
const CurrentItems = require("./currentItems")
const sequelize = new Sequelize({
  database: process.env.DATABASE_NAME,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: 5432,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true, // This will help you. But you will see nwe error
      rejectUnauthorized: false // This line will fix new error
    }
  },
});
// const sequelize = new Sequelize('homeInventoryManagement', 'root', '', {
//   host: 'localhost',
//   port: 3306,
//   dialect: 'mysql',
// });

const UserModel = User(sequelize, DataTypes)
const ItemsModel = Item(sequelize, DataTypes)
const PurchasedItemsModel = PurchasedItem(sequelize, DataTypes)
const CurrentItemsModel = CurrentItems(sequelize, DataTypes)

ItemsModel.hasMany(PurchasedItemsModel, { as: "itemDetail", foreignKey: 'item_no' });
PurchasedItemsModel.belongsTo(ItemsModel, { as: "itemDetail", foreignKey: 'item_no' })

ItemsModel.hasMany(CurrentItemsModel, { as: "itemDetails", foreignKey: 'item_no' });
CurrentItemsModel.belongsTo(ItemsModel, { as: "itemDetails", foreignKey: 'item_no' });
module.exports = {
  // UserModel
  ItemsModel, PurchasedItemsModel, CurrentItemsModel
}