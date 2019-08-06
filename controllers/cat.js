const catDB = require("../models/cat.js");

function Edit(req, res) {
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
            user: user,
            edit: true,
        })

    })
}

function RetrieveAll(req, res) {
    let user = null
    if (req.session.username) {
        user = {};
        user.username = req.session.username;
        user.admin = req.session.admin;
        user.moderator = req.session.moderator;
    }
    let filters = {
        location: req.query.location,
        gender: req.query.gender,
        furPattern: req.query.furPattern,
        neutered: req.query.neutered,
        age: req.query.age
    }
    catDB.RetrieveAll(filters, (cats) => {
        console.log(cats)
        res.render("cats.hbs", {
            cats: cats,
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
    let catId = req.query.id;
    catDB.RetrieveOne(catId, (cat) => {
        res.render("catInfo.hbs", {
            cat: cat,
            user: user,
            edit: false,
        })

    })
}

function Create(req, res) {
    let cat = {
        "age": req.body.age,
        "complications": req.body.complications,
        "adoption": req.body.adoption,
        "furPattern": req.body.furPattern,
        "gender": req.body.gender,
        "location": req.body.location,
        "medProcedures": req.body.medProcedures,
        "name": req.body.name,
        "notes": req.body.notes
    }
    catDB.Create(cat, (err) => {
        if(err) res.send(err)
        else res.redirect(req.get('referer'));
    })
}

function Update(req, res) {

}

function Delete(req, res) {
    let catId = req.body.id;
    catDB.Delete(catId, (err) => {
        if (err) res.send(err)
        else res.redirect(req.get('referer'))
    })
}

module.exports = {
    Create,
    RetrieveAll,
    RetrieveOne,
    Edit,
    Update,
    Delete
}