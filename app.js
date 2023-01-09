const express = require("express");
const app = express();
const path = require("path");


app.set("view engine" , "ejs");
app.set("views", path.join(__dirname,"views"));



app.get("/", (req, res) => {
    res.render("home");
})

// APP IS LISTENING ON PORT:
//=============================================================================================
app.listen(3001, () => {
    console.log("APP IS LISTENING ON PORT 3001!")
})