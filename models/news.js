const db = require("./db.js");
const database = db.database;
const fs = require("fs")

function Create(newsPost, callback) {
    let id = database.ref('news/').push().key;
    if (newsPost.imgBase64) {
        var base64Data = newsPost.imgBase64.replace(/^data:image\/jpeg;base64,/, "");
        base64Data = base64Data.replace(/^data:image\/png;base64,/, "");
        let type = newsPost.imgFileType.substring(6);
        if (type == "jpeg") type = "jpg"
        path = "public/assets/images/articles/" + id + "." + type;
        console.log(path)
        fs.writeFile(path, base64Data, "base64", function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log("Successfully written in file system")
                database.ref('news/' + id).set({
                    "title": newsPost.title,
                    "timestamp": newsPost.timestamp,
                    "author": newsPost.author,
                    "picture": "../assets/images/articles/" + id + "." + type,
                    "content": newsPost.content
                }, (err) => {
                    callback(err);
                });
            }
        });
    } else {
        database.ref('news/' + id).set({
            "title": newsPost.title,
            "timestamp": newsPost.timestamp,
            "author": newsPost.author,
            "picture": "../assets/images/website.png",
            "content": newsPost.content
        }, (err) => {
            callback(err);
        });
    }
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
