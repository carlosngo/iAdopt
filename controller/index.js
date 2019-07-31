const express = require("express")
const bparser = require("body-parser")
const hbs = require("hbs")
const urlencoder = bparser.urlencoded({
    extended: false
})
const session = require("express-session")
const cparser = require("cookie-parser");
const app = express();

// Models
const catDB = require("../model/cats.js");
const userDB = require("../model/users.js");
const newsDB = require("../model/news.js");

app.set('view engine', 'hbs')

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {

    // catDB.Create({
    //     "age": "Adult",
    //     "complications": "N/A",
    //     "forAdoption": "false",
    //     "furPattern": "tortoiseshell",
    //     "gender": "Female",
    //     "location": "St. Joseph Hall",
    //     "medicalProcedures": ["spayed", "neutered"],
    //     "name": "Mooncake",
    //     "notes": "Romeow's GF"
    // }, (err) => {
    //     if (err) res.send(err)
    //     else res.send("Cat creation successful");
    // })

    catDB.Retrieve("catB", (cat) => {
        console.log(cat)
    })
    // res.sendFile(__dirname + "/public/html/home.html")

    // catDB.Delete("catC", (err) => {
    //     if (err) res.send(err);
    //     else res.send("Successfully deleted catC");
    // })
})

app.listen(3000, function() {
    console.log("live at port 3000");
})