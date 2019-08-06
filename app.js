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
const catDB = require(__dirname + "/models/cat.js");
const userDB = require(__dirname + "/models/user.js");
const newsDB = require(__dirname + "/models/news.js");
const requestDB = require(__dirname + "/models/request.js");

// Controllers
const catController = require(__dirname + "/controllers/cat.js")
const userController = require(__dirname + "/controllers/user.js")
const newsController = require(__dirname + "/controllers/news.js")
const requestController = require(__dirname + "/controllers/request.js")

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

app.use(session({
    secret: "hailHydra",
    name: "acctCookie",
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 31
    }
}));

app.use(cparser())

// Routes
app.get("/", newsController.RetrieveAll)
app.get("/article", newsController.RetrieveOne)
app.post("/addArticle", urlencoder, newsController.Create)
app.post("/updateArticle", urlencoder, newsController.Update)
app.post("/deleteArticle", urlencoder, newsController.Delete) 

app.get("/cats", catController.RetrieveAll)
app.get("/cat", catController.RetrieveOne)
app.get("/editCat", catController.Edit)
app.post("/addCat", urlencoder, catController.Create)
app.post("/updateCat", urlencoder, catController.Update)
app.post("/deleteCat", urlencoder, catController.Delete)

app.get("/requests", requestController.RetrieveAll)
app.post("/addRequest", urlencoder, requestController.Create)
app.post("/cancelRequest", urlencoder, requestController.Delete)

app.get("/users", userController.RetrieveAll)
app.get("/profile", userController.RetrieveOne)
app.post("/login", urlencoder, userController.authenticate)
app.post("/signup", urlencoder, userController.Create)
app.post("/logout", urlencoder, userController.logout)
app.post("/updateUser", urlencoder, userController.Update)

app.listen(3000, function() {
    console.log("live at port 3000");
})