const express = require("express");
const app = express();


app.get("/", (req, res) => {
    res.send("Hello Campers!!");
})

// APP IS LISTENING ON PORT:
//=============================================================================================
app.listen(3001, () => {
    console.log("APP IS LISTENING ON PORT 3001!")
})