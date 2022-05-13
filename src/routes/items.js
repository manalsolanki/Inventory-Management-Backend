const express = require("express");
const { Sequelize } = require('sequelize');
const { ItemsModel, PurchasedItemsModel, CurrentItemsModel, UserModel } = require("../models")
const router = express.Router();
const Op = Sequelize.Op;
const jwt = require("jsonwebtoken");
const checkUser = require('../middleware/auth');
const { header } = require("express/lib/request");

const getItemList = (req, res) => {
    let condition = { item_name: { [Op.like]: `tomato%` } };
    ItemsModel.findAll().then(items => {
        res.send({ success: true, items });
    }).catch(err => {
        console.log(err);
        res.status(500).send({ success: true })
    })
}

const getPurchasedItemList = (req, res) => {
    PurchasedItemsModel.findAll({
        where: { user_id: req.header("UserId") },
        include: [{ model: ItemsModel, as: 'itemDetail' }, { model: UserModel, as: 'userDetail' }], order: [['id', 'DESC']]
    }).then(items => {
        res.send({ success: true, items })
    }).catch(err => {
        console.log(err)
        res.status(500).send({ success: false, err })
    })
}
const getAllCurrentItem = (req, res) => {
    CurrentItemsModel.findAll({
        where: { user_id: req.header("UserId") },
        include: [{ model: ItemsModel, as: 'itemDetails' }], order: [['id', 'ASC']]
    }).then(items => {
        res.send({ success: true, items })
    }).catch(err => {
        res.status(500).send({ success: false, err })
    })
}

const addNewItem = (req, res) => {
    ItemsModel.create(req.body)
        .then(data => {
            res.send({ success: true, data })
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while adding the new Item."
            });
        });
}

const addPurchasedItem = async (req, res) => {
    let { item_no, date_of_purchase, units, quantity, price, item_name, user_id } = req.body;
    console.log(item_name)
    if (item_no === 0) {
        item_no = await ItemsModel.create({ item_name })
            .then(data => {
                return data.id
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while adding the new Item."
                });
            });
    }
    const newItem = { item_no, date_of_purchase, quantity, units, price, user_id }
    let insertedItem = await PurchasedItemsModel.create(newItem)
        .then(data => {
            res.send({ success: true, data });
            return data
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        });

    CurrentItemsModel.findOne({
        include: [{ model: ItemsModel, as: 'itemDetails' }],
        where: { [Op.and]: [{ user_id: user_id }, { item_no: insertedItem.dataValues.item_no }] }
    }).then(items => {

        if (items) {
            CurrentItemsModel.update({ quantity: items.dataValues.quantity + insertedItem.dataValues.quantity }, { where: { item_no: insertedItem.dataValues.item_no } })
                .then(item =>
                    console.log(item)).catch(err => {
                        console.log(err)
                    })
        }
        else {
            const newCurrentItem = { item_no, quantity, Unit: units, user_id }
            CurrentItemsModel.create(newCurrentItem)
                .then(data => {
                    console.log(data)
                })
                .catch(err => {
                    console.log(err)
                });
        }
        // res.send({ success: true, items })
    }).catch(err => {
        console.log({ success: false, err })
    })
}


const updateCurrentItem = (req, res) => {
    const { id, quantity } = req.body
    CurrentItemsModel.update({ quantity: quantity }, { where: { id: id } })
        .then(item =>
            res.send({ success: true, item }))
        .catch(err => {
            res.status(500).send({ success: fail, err })
        })
}
router.get("/", getItemList);
router.get("/purchaseditem", checkUser, getPurchasedItemList)
router.get("/currentitems", checkUser, getAllCurrentItem)
router.post("/addnewitem", addNewItem)
router.post("/addpurchaseditem", checkUser, addPurchasedItem)
router.post("/updatecurrentitem", updateCurrentItem)
module.exports = router;