const db = require("./db.js");
const database = db.database;

function Create(userRequest, callback) {
    let id = database.ref('requests/').push().key;
    database.ref('requests/' + id).set({
        "user": userRequest.user,
        "content": userRequest.content,
        "status": userRequest.status
    }, (err) => {
        callback(err);
    });
}

function RetrieveOne(requestId, callback) {
    database.ref('requests/' + requestId).once('value').then(function(snapshot) {
        callback(snapshot.val())
    });
}

function RetrieveAll(callback) {
    database.ref('requests').once('value').then(function(snapshot) {
        callback(snapshot.val());
    })
}


function Update(requestId, newData, callback) {
    var updates = {};
    updates['/requests/' + requestId] = newData;
    database.ref().update(updates, (err) => {
        callback(err);
    })
}

function Delete(requestId, callback) {
    database.ref('requests/' + requestId).remove((err) => {
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
