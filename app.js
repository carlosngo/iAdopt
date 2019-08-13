const express = require("express")
const bparser = require("body-parser")
const hbs = require("hbs")
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

app.use(bparser.json({limit: "50mb"}));
app.use(bparser.urlencoded({limit: "50mb", extended: true}))

// Routes
app.get("/", newsController.RetrieveAll)
app.get("/article", newsController.RetrieveOne)
app.post("/addArticle", newsController.Create)
app.post("/updateArticle", newsController.Update)
app.post("/deleteArticle", newsController.Delete) 

app.get("/cats", catController.RetrieveAll)
app.get("/cat", catController.RetrieveOne)
app.get("/editCat", catController.Edit)
app.post("/addCat", catController.Create)
app.post("/updateCat", catController.Update)
app.post("/deleteCat", catController.Delete)

app.get("/requests", requestController.RetrieveAll)
app.post("/adopt", requestController.Create)
app.post("/completeRequest", requestController.Complete)
app.post("/deleteRequest", requestController.Delete)

app.get("/users", userController.RetrieveAll)
app.get("/profile", userController.RetrieveOne)
app.post("/login", userController.authenticate)
app.post("/signup", userController.Create)
app.post("/logout", userController.logout)
app.post("/updateUser", userController.Update)
app.post("/toggleModerator", userController.toggleModerator)

app.listen(process.env.PORT || 3000, function() {
    console.log("live at port 3000");
})