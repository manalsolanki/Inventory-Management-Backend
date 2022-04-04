const express = require("express");
const { UserModel } = require("../models");
const { ItemsModel } = require("../models")
const router = express.Router();

const getUserList = (req, res) => {
  UserModel.findAll().then(users => {
    res.send({ success: true, users });
  }).catch(err => {
    console.log(err);
    res.status(500).send({ success: false })
  })
};

const getItemList = (req, res) => {
  ItemsModel.findAll().then(items => {
    res.send({ success: true, items });
  }).catch(err => {
    console.log(err);
    res.status(500).send({ success: false })
  })
}

router.get("/", getUserList);

module.exports = router;
