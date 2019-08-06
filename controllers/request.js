const requestDB = require("../models/request.js");

function RetrieveAll(req, res) {
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
}

function RetrieveOne(req, res) {
}

function Create(req, res) {
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