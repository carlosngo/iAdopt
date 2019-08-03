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
const requestDB = require(__dirname + "/model/requests.js");

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


app.get("/", (req, res) => {
    let user = null
    if (req.session.username) {
        user = {};
        user.username = req.session.username;
        user.admin = req.session.admin;
        user.moderator = req.session.moderator;
    }
    newsDB.RetrieveAll((news) => {
        res.render("home.hbs", {
            news: news,
            user: user
        })
    })
})

app.get("/article", (req, res) => {
    let user = null
    if (req.session.username) {
        user = {};
        user.username = req.session.username;
        user.admin = req.session.admin;
        user.moderator = req.session.moderator;
    }
    let articleId = req.query.id;
    newsDB.RetrieveOne(articleId, (article) => {
        res.render("articlePage.hbs", {
            article: article,
            user: user
        })
    })
})

app.post("/addArticle", urlencoder, (req, res) => {

})

app.post("/updateArticle", urlencoder, (req, res) => {

})

app.get("/cats", (req, res) => {
    let user = null
    if (req.session.username) {
        user = {};
        user.username = req.session.username;
        user.admin = req.session.admin;
        user.moderator = req.session.moderator;
    }
    let filters = req.query.filters;
    catDB.RetrieveAll((cats) => {
        console.log(cats)
        res.render("cats.hbs", {
            cats: cats,
            user: user
        })
    })
})

app.get("/cat", (req, res) => {
    let user = null
    if (req.session.username) {
        user = {};
        user.username = req.session.username;
        user.admin = req.session.admin;
        user.moderator = req.session.moderator;
    }
    let catId = req.query.id;
    catDB.RetrieveOne(catId, (cat) => {
        res.render("catInfo.hbs", {
            cat: cat,
            user: user
        })

    })
})


app.post("/addCat", urlencoder, (req, res) => {

})

app.post("/updateCat", urlencoder, (req, res) => {

})

app.get("/requests", (req, res) => {
    let user = null
    if (req.session.username) {
        user = {};
        user.username = req.session.username;
        user.admin = req.session.admin;
        user.moderator = req.session.moderator;
    }
    requestDB.RetrieveAll((requests) => {
        res.render("requests.hbs", {
            requests: requests,
            user: user
        })
    })
})

app.post("/addRequest", urlencoder, (req, res) => {

})

app.post("/cancelRequest", urlencoder, (req, res) => {

})


app.get("/users", (req, res) => {
    let user = null
    if (req.session.username) {
        user = {};
        user.username = req.session.username;
        user.admin = req.session.admin;
        user.moderator = req.session.moderator;
    }
    userDB.RetrieveAll((users) => {
        res.render("users.hbs", {
            users: users,
            user: user
        })
    })
})

app.get("/profile", (req, res) => {
    userDB.RetrieveOne(req.session.username, (user) => {
        res.render("profilePage.hbs", {
            user: user
        })
    })
})

app.post("/login", urlencoder, (req, res) => {
    let un = req.body.un;
    let pw = req.body.pw;
    console.log(un)
    console.log(pw)
    userDB.RetrieveOne(un, (user) => {
        console.log(user)
        if (user && user.password === pw) {
            req.session.username = un;
            req.session.admin = user.admin;
            req.session.moderator = user.moderator;
            console.log(req.session)
            res.send("OK")
            
        } else {
            res.send("FAIL")
        }
    })
})

app.post("/signup", urlencoder, (req, res) => {
    let un = req.body.un;
    let pw = req.body.pw;
    let email = req.body.email;
    userDB.RetrieveOne(un, (user) => {
        console.log(user)
        if (user) {
            res.send("FAIL")            
        } else {
            user = {};
            user.username = un;
            user.password = pw;
            user.email = email;
            user.admin = false;
            user.moderator = false;
            userDB.Create(user, (err) => {
                if (err) {
                    console.log(err);
                    res.send("FAIL")
                } else {
                    req.session.username = un;
                    req.session.admin = user.admin;
                    req.session.moderator = user.moderator;
                    res.send("OK")
                }
            })
    
        }
    })  
})

app.post("/logout", urlencoder, (req, res) => {
    req.session.username = null;
    req.session.admin = null;
    req.session.moderator = null;
    res.send("OK")
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
        admin: true
    })
})

app.listen(3000, function() {
    console.log("live at port 3000");
})