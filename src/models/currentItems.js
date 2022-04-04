module.exports = (sequelize, DataTypes) => {
    const CurrentItemsModel = sequelize.define("currentItem", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        item_no: {
            type: DataTypes.INTEGER,
            allowNull: false,

        },
        quantity: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        Unit: {
            type: DataTypes.STRING(50),
            allowNull: false
        },


    }, {
        tableName: "current_items",
        timestamps: false
    })

    return CurrentItemsModel
}