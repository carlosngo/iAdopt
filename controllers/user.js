const userDB = require("../models/user.js");
const crypto = require("crypto-js");

function authenticate(req, res) {
    let un = req.body.un;
    let pw = req.body.pw;
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
}

function logout(req, res) {
    req.session.username = null;
    req.session.admin = null;
    req.session.moderator = null;
    res.send("OK")
}

function RetrieveAll(req, res) {
    let user = null
    if (req.session.username) {
        user = {};
        user.username = req.session.username;
        user.admin = req.session.admin;
        user.moderator = req.session.moderator;
        if (user.admin) {
            userDB.RetrieveAll((users) => {
            res.render("users.hbs", {
                    users: users,
                    user: user
                })
            })
        }
    } else {
        res.send("Error 404")
    }
    
}

function RetrieveOne(req, res) {
    userDB.RetrieveOne(req.session.username, (user) => {
        res.render("profile.hbs", {
            user: user
        })
    })
}

function Create(req, res) {
    let un = req.body.un;
    let pw = req.body.pw;
    let email = req.body.email;
    userDB.RetrieveOne(un, (user) => {
        console.log(user)
        if (user) {
            res.send("FAIL")            
        } else {
            user = {};
            user.password = pw;
            user.email = email;
            user.admin = false;
            user.moderator = false;
            console.log("Hi I am here" + user.username + user.password + user.email);
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
}

function Update(req, res) {
    let un = req.body.un;
    let pw = req.body.pw;
    let email = req.body.email;

    userDB.RetrieveOne(un, (user)=>{
        if(user){
            user.password = pw;
            user.email = email;
            let key = "username";
            delete user[key]; 
            console.log(JSON.stringify(user));
            userDB.Update(un, user, (err)=>{
                if(err){
                    console.log(err);
                    res.send("FAIL Update");
                }else{
                    req.session.username = un;
                    req.session.admin = user.admin;
                    req.session.moderator = user.moderator;
                    res.send("Update SUCCESS");
                }
            })
        }
    })
}

function Delete(req, res) {
    
}

function toggleModerator(req, res) {
    let username = req.body.username;
    userDB.toggleModerator(username, (err) => {
        if (err) res.send(err);
        else res.redirect(req.get('referer'));
    })
}

module.exports = {
    authenticate,
    logout,
    toggleModerator,
    Create,
    RetrieveAll,
    RetrieveOne,
    Update,
    Delete
}