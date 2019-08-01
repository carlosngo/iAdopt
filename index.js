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
const catDB = require(__dirname + "/model/cats.js");
const userDB = require(__dirname + "/model/users.js");
const newsDB = require(__dirname + "/model/news.js");

hbs.registerPartials(__dirname + "/views/partials", () => {
    console.log("Partials have successfully loaded.")
})

app.set('view engine', 'hbs')

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
})

app.get("/article", (req, res) => {
    let articleId = req.query.id;
})

app.post("/addArticle", urlencoder, (req, res) => {

})

app.post("/updateArticle", urlencoder, (req, res) => {

})

app.get("/cats", (req, res) => {

})

app.get("/cat", (req, res) => {
    let catId = req.query.id;
})

app.post("/addCat", urlencoder, (req, res) => {

})

app.post("/updateCat", urlencoder, (req, res) => {

})


app.get("/users", (req, res) => {

})

app.get("/user", (req, res) => {
    let userId = req.query.id;
})

app.post("/login", urlencoder, (req, res) => {

})

app.post("/signup", urlencoder, (req, res) => {

})

app.post("/updateUser", urlencoder, (req, res) => {

})

app.get("/testDB",(req, res) => {
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

app.get("/testHBS", (req, res) => {
    res.render("home.hbs", {
        login:true, 
        admin:true
    });
})

app.listen(3000, function() {
    console.log("live at port 3000");
})