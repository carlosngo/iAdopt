const requestDB = require("../models/request.js");
const catDB = require("../models/cat.js")

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function RetrieveAll(req, res) {
    let user = null
    if (req.session.username) {
        user = {};
        user.username = req.session.username;
        user.admin = req.session.admin;
        user.moderator = req.session.moderator;
    }
    requestDB.RetrieveAll((requests) => {
        if (requests) {
            var total = Object.keys(requests).length;
            var count = 0;
            let pending = {};
            let completed = {};
            for (let request in requests) {
                catDB.RetrieveOne(requests[request].cat, (cat) => {
                    requests[request].cat = cat;
                    count++;
                    if (count > total - 1) {
                        for (let r in requests) {
                            if (requests[r].completed) completed[r] = requests[r];
                            else pending[r] = requests[r];
                        }
                        res.render("requests.hbs", {
                            requests: {
                                pending: Object.keys(pending).length > 0 ? pending : null,
                                completed: Object.keys(completed).length > 0 ? completed : null
                            },
                            user: user
                        })
                    }
                });
            }
        } else {
            res.render("requests.hbs", {
                requests: {
                    pending: null,
                    completed: null
                },
                user: user
            })
        }
        

        // res.render("requests.hbs", {
        //     requests: {
        //         pending: pending,
        //         completed: completed
        //     },
        //     user: user
        // })
    })
}

function Create(req, res) {
    let timestamp = new Date()
    let request = {
        user: req.body.username,
        cat: req.body.catId,
        timestamp,
        completed: false
    }
    requestDB.Create(request, (err) => {
        if (err) res.send(err)
        else res.redirect(req.get('referer'));
    })
}

function Delete(req, res) {
    let requestId = req.body.id;
    requestDB.Delete(requestId, (err) => {
        if (err) res.send(err)
        else res.redirect(req.get('referer'));
    })
}

function Complete(req, res) {
    let requestId = req.body.id;
    requestDB.Complete(requestId, (err) => {
        if (err) res.send(err)
        else res.redirect(req.get('referer'));
    })
}

module.exports = {
    Create,
    RetrieveAll,
    Delete,
    Complete
}