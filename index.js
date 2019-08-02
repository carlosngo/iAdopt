const express = require("express")
const bparser = require("body-parser")
const hbs = require("hbs")
const urlencoder = bparser.urlencoded({
    extended: false
})
const fs = require("fs")
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
hbs.registerHelper('breaklines', function(text) {
    text = hbs.Utils.escapeExpression(text);
    text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
    return new hbs.SafeString(text);
});

app.set('view engine', 'hbs')

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    newsDB.RetrieveAll((news) => {
        console.log(news)
        res.render("home.hbs", {
            news: news,
            user: {
                username: "Carlos",
                password: "ngo",
                admin: true,
            },
        })
    })
})

app.get("/article", (req, res) => {
    let articleId = req.query.id;
})

app.post("/addArticle", urlencoder, (req, res) => {

})

app.post("/updateArticle", urlencoder, (req, res) => {

})

app.get("/cats", (req, res) => {
    let filters = req.query.filters;
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

    // catDB.Retrieve("catB", (cat) => {
    //     console.log(cat)
    // })
    // res.sendFile(__dirname + "/public/html/home.html")

    // catDB.Delete("catC", (err) => {
    //     if (err) res.send(err);
    //     else res.send("Successfully deleted catC");
    // })

    // newsDB.Create({
    //     "title": "AGGIE IS BACK!",
    //     "timestamp": "June 13 at 8:38 PM",
    //     "author": "Anne Agu",
    //     "preview": "'She was lost and is found.' <br> The Parable of the Prodigal Cat <br> Love you, Aggie. Welcome back.",
    //     "pictureUrl": "../assets/images/aggie.jpg",
    //     "content": "'She was lost and is found.' <br> The Parable of the Prodigal Cat <br> Love you, Aggie. Welcome back."
    // }, (err) => {
    //     if (err) res.send(err)
    //     else res.send("News creation successful")
    // })
})

app.get("/testHBS", (req, res) => {
    res.render("home.hbs", {
        login: true,
        admin: true,
    })
})

app.listen(3000, function() {
    console.log("live at port 3000");
})