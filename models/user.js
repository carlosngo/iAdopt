const db = require("./db.js");
const database = db.database;

function Create(user, callback) {
    let id = database.ref('users/').push().key;
    database.ref('users/' + user.username).set({
        "email": user.email,
        "password": user.password,
        "admin": user.admin,
        "moderator": user.moderator
    }, (err) => {
        callback(err);
    });
}

function RetrieveOne(username, callback) {
    database.ref('users/' + username).once('value').then(function(snapshot) {
        callback(snapshot.val())
    });
}

function RetrieveAll(callback) {
    database.ref('users').once('value').then(function(snapshot) {
        callback(snapshot.val());
    })
}

function Update(username, newData, callback) {
    var updates = {};
    updates['/users/' + username] = newData;
    database.ref().update(updates, (err) => {
        callback(err);
    })
}

function Delete(username, callback) {
    database.ref('users/' + username).remove((err) => {
        callback(err);
    })
}

module.exports = {
    Create,
    RetrieveOne,
    RetrieveAll,
    Update,
    Delete
}