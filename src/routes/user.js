const express = require("express");
const { UserModel } = require("../models");
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require("jsonwebtoken");

const getUserList = (req, res) => {
  UserModel.findAll().then(users => {
    res.send({ success: true, users });
  }).catch(err => {
    console.log(err);
    res.status(500).send({ success: false })
  })
};

const loginUser = (req, res) => {
  UserModel.findOne({ where: { email: req.body.userEmail } }).then(user => {
    if (!user) {
      res.status(404).send({ success: false, message: " Please check the email or Password." })
    }
    else {
      bcrypt.compare(req.body.password, user.password)
        .then((isMatched) => {
          if (isMatched) {
            const token = jwt.sign({ userEmail: req.body.userEmail }, 'manal');
            res.send({ success: true, token, userId: user.dataValues.id });
          }
          else {
            res.status(404).send({ success: false, message: " Please check the email or Password." })
          }
        })
    }
  })
    .catch(err => {
      res.status(500).send({ success: false, message: "Something went wrong please try again" })
    })
}

const addUser = async (req, res) => {
  let { first_name, last_name, email, password } = req.body;
  UserModel.findOne({ where: { email: email } }).then(user => {
    if (user) {
      res.status(500).send({ success: false, message: "Users email already exists" })
    }
    else {
      bcrypt.genSalt(10, function (err, Salt) {
        bcrypt.hash(password, Salt, (err, encryptedPassword) => {
          UserModel.create({ first_name, last_name, email, password: encryptedPassword })
            .then(data => {
              res.send({ success: true, data })
            })
            .catch(err => {
              res.status(500).send({
                message: "Some error occurred while adding the new User."
              });
            }
            )
        })
      })
    }
  })

}


router.get("/", getUserList);
router.post("/loginuser", loginUser);
router.post("/adduser", addUser);
module.exports = router;
