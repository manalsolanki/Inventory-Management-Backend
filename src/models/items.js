module.exports = (sequelize, DataTypes) => {
    const ItemsModel = sequelize.define("item", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        item_name: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    }, {
        tableName: "item_list",
        timestamps: false
    })

    return ItemsModel
}