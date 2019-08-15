const newsDB = require("../models/news.js");
const catDB = require("../models/cat.js")

function RetrieveAll(req, res) {
    let user = null
    if (req.session.username) {
        user = {};
        user.username = req.session.username;
        user.admin = req.session.admin;
        user.moderator = req.session.moderator;
    }
    newsDB.RetrieveAll((news) => {
        catDB.RetrieveAll(null, (cats) => {
            let featured = {};
            res.render("home.hbs", {
                news: news,
                cats: cats,
                user: user
            })
        })
    })
}

function RetrieveOne(req, res) {
    let user = null
    if (req.session.username) {
        user = {};
        user.username = req.session.username;
        user.admin = req.session.admin;
        user.moderator = req.session.moderator;
    }
    let referer = req.get('referer')
    let articleId = req.query.id;
    
    newsDB.RetrieveOne(articleId, (article) => {
        let owner = false;
        if (user && article) {
            owner = user.username === article.author;
        }
        res.render("article.hbs", {
            id: articleId,
            article: article,
            user: user,
            referer,
            owner
        })
    })
}

function Create(req, res) {
    let article = {
        "title": req.body.title,
        "timestamp": req.body.timestamp,
        "author": req.body.author,
        "img": req.body.img,
        "content": req.body.content
    }
    newsDB.Create(article, (id, err) => {
        if (err) res.send("FAIL");
        else res.send(id)
    })
}

function Update(req, res) {
    let article = {
        "title": req.body.title,
        "content": req.body.content
    }
    console.log('req.body.id = ')
    console.log(req.body.id)
    newsDB.Update(req.body.id, article, (err) => {
        if(err) res.send(err)
        else res.redirect(req.get('referer'));
    })
}

function Delete(req, res) {
    let articleId = req.body.id;
    newsDB.Delete(articleId, (err) => {
        if (err) res.send(err)
        else res.redirect("/")
    })
}

module.exports = {
    Create,
    RetrieveAll,
    RetrieveOne,
    Update,
    Delete
}