//Installed Dependencies:
const express = require("express");
const app = express();
const path = require("path");



//Middlewares:
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


//Routes:
app.get("/", (req, res) => {
    res.render("home");
})


// APP IS LISTENING ON PORT:
//=============================================================================================
app.listen(3001, () => {
    console.log("APP IS LISTENING ON PORT 3001!")
})