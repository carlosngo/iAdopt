const db = require("./db.js");
const database = db.database;

function Create(newsPost, callback) {
    let id = database.ref('posts/').push().key;
    database.ref('posts/' + id).set({
        "content": newsPost.content,
        "time-posted": newsPost.time-posted,
        "author": newsPost.author,
        "picture": newsPost.picture
    }, (err) => {
        callback(err);
    });
}

function RetrieveOne(postId, callback) {
    database.ref('posts/' + postId).once('value').then(function(snapshot) {
        callback(snapshot.val())
    });
}

function RetrieveAll(callback) {
    database.ref('posts').once('value').then(function(snapshot) {
        callback(snapshot.val());
    })
}


function Update(postId, newData, callback) {
    var updates = {};
    updates['/posts/' + postId] = newData;
    database.ref().update(updates, (err) => {
        callback(err);
    })
}

function Delete(postId, callback) {
    database.ref('posts/' + postId).remove((err) => {
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
