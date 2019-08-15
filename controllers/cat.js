const catDB = require("../models/cat.js");
const requestDB = require("../models/request.js")
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
        name: req.query.name ? req.query.name : "",
        location: req.query.location ? req.query.location : "All",
        gender: req.query.gender ? req.query.gender : "All",
        furPattern: req.query.furPattern ? req.query.furPattern : "All",
        age: req.query.age ? req.query.age : "All",
        adoption: req.query.adoption ? req.query.adoption : false
    }
    catDB.RetrieveAll(filters, (cats) => {
        console.log(cats)
        res.render("cats.hbs", {
            filters: filters,
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
    let referer = req.get('referer');
    catDB.RetrieveOne(catId, (cat) => {
        if (user) {
            requestDB.RetrieveOne(user.username, catId, (request) => {
                res.render("cat.hbs", {
                    id: catId,
                    cat: cat,
                    user: user,
                    edit: false,
                    request: request,
                    referer
                })
            })
        } else {
            res.render("cat.hbs", {
                id: catId,
                cat: cat,
                user: user,
                edit: false,
                request: null,
                referer
            })
        }

    })
}

function Create(req, res) {
    let cat = {
        "age": req.body.age,
        "complications": req.body.complications,
        "adoption": req.body.adoption == "true" ? true : false,
        "furPattern": req.body.furPattern,
        "gender": req.body.gender,
        "location": req.body.location,
        "medProcedures": req.body.medProcedures,
        "name": req.body.name,
        "notes": req.body.notes,
        "numOfPics": parseInt(req.body.numOfPics)
    }
    catDB.Create(cat, (id, err) => {
        if(err) res.send("FAIL")
        else res.send(id);
    })
}

function Update(req, res) {
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
    console.log('req.body.id = ')
    console.log(req.body.id)
    catDB.Update(req.body.id, cat, (err) => {
        if(err) res.send(err)
        else res.redirect(req.get('referer'));
    })
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