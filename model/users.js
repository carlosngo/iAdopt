const db = require("./db.js");
const database = db.database;

function Create(user, callback) {
    let id = database.ref('users/').push().key;
    database.ref('users/' + id).set({
        "email": user.email,
        "username": user.username,
        "password": user.password,
        "isAdmin": user.isAdmin
    }, (err) => {
        callback(err);
    });
}

function RetrieveOne(userId, callback) {
    database.ref('users/' + userId).once('value').then(function(snapshot) {
        callback(snapshot.val())
    });
}

function RetrieveAll(callback) {
    database.ref('users').once('value').then(function(snapshot) {
        callback(snapshot.val());
    })
}

function Update(userId, newData, callback) {
    var updates = {};
    updates['/users/' + userId] = newData;
    database.ref().update(updates, (err) => {
        callback(err);
    })
}

function Delete(userId, callback) {
    database.ref('users/' + userId).remove((err) => {
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