const db = require("./db.js");
const database = db.database;

function Create(newsPost, callback) {
    let id = database.ref('news/').push().key;
    database.ref('news/' + id).set({
        "title": newsPost.title,
        "timestamp": newsPost.timestamp,
        "author": newsPost.author,
        "preview": newsPost.preview,
        "picture": newsPost.pictureUrl,
        "content": newsPost.content
    }, (err) => {
        callback(err);
    });
}

function RetrieveOne(postId, callback) {
    database.ref('news/' + postId).once('value').then(function(snapshot) {
        callback(snapshot.val())
    });
}

function RetrieveAll(callback) {
    database.ref('news').once('value').then(function(snapshot) {
        callback(snapshot.val());
    })
}


function Update(postId, newData, callback) {
    var updates = {};
    updates['/news/' + postId] = newData;
    database.ref().update(updates, (err) => {
        callback(err);
    })
}

function Delete(postId, callback) {
    database.ref('news/' + postId).remove((err) => {
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
