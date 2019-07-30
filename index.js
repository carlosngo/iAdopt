const express = require("express")
const bparser = require("body-parser")
const hbs = require("hbs")
const urlencoder = bparser.urlencoded({
    extended: false
})
const session = require("express-session")
const cparser = require("cookie-parser");
const app = express();
app.set('view engine', 'hbs')

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/html/home.html")
})

app.listen(3000, function() {
    console.log("live at port 3000");
})