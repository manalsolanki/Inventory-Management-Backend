module.exports = (sequelize, DataTypes) => {
    const PurchasedItemsModel = sequelize.define("purchasedItem", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        item_no: {
            type: DataTypes.INTEGER,
            allowNull: false,

        },
        date_of_purchase: {
            type: DataTypes.DATE,
            allowNull: false
        },
        quantity: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        units: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
        ,
    }, {
        tableName: "purchased_item",
        timestamps: false
    })

    return PurchasedItemsModel
}