//Imported Models:
const User = require("../models/user");


//GET ROUTE: serving a registration form to a User
module.exports.renderRegister = (req, res) => {
    res.render("./users/register");
}