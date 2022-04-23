const jwt = require("jsonwebtoken");

const checkUser = (req, res, next) => {
    try {
        let decoded = jwt.verify(req.header('Authorization'), 'manal');
        next();
    }
    catch (err) {
        res.status(401).send({ success: false, message: " Please check login Credentials" })
    }
}
module.exports = checkUser;