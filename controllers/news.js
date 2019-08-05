const newsDB = require("../models/news.js");

function RetrieveAll(req, res) {
    let user = null
    if (req.session.username) {
        user = {};
        user.username = req.session.username;
        user.admin = req.session.admin;
        user.moderator = req.session.moderator;
    }
    newsDB.RetrieveAll((news) => {
        for (let article in news) {
            let content = news[article].content;
            if (content.length > 250) {
                news[article].content = news[article].content.substr(0, 250) + "..."
            }
        }
        res.render("home.hbs", {
            news: news,
            user: user
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
    let articleId = req.query.id;
    newsDB.RetrieveOne(articleId, (article) => {
        res.render("articlePage.hbs", {
            article: article,
            user: user
        })
    })
}

function Create(req, res) {
    let article = {
        "title": req.body.title,
        "timestamp": req.body.timestamp,
        "author": req.body.author,
        "imgBase64": req.body.imgBase64,
        "imgFileType": req.body.imgFileType,
        "content": req.body.content
    }
    console.log(article)
    newsDB.Create(article, (err) => {
        if (err) res.send(err);
        else res.send("OK")
    })
}

function Update(req, res) {

}

function Delete(req, res) {
    
}

module.exports = {
    Create,
    RetrieveAll,
    RetrieveOne,
    Update,
    Delete
}