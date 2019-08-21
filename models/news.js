const fb = require("./fb.js");
const database = fb.database;
const storage = fb.storage;

function Create(newsPost, callback) {
    let id = database.ref('news/').push().key;
    database.ref('news/' + id).set({
        "title": newsPost.title,
        "timestamp": newsPost.timestamp,
        "author": newsPost.author,
        "content": newsPost.content
    }, (err) => {
        callback(id, err);
    });
    
}

function RetrieveOne(postId, callback) {
    database.ref('news/' + postId).once('value').then(function(snapshot) {
        callback(snapshot.val());
    });
}

function RetrieveAll(callback) {
    database.ref('news').once('value').then(function(snapshot) {
        let news = snapshot.val();
        for (let article in news) {
            let content = news[article].content;
            if (content.length > 200) {
                news[article].content = news[article].content.substr(0, 200) + "..."
            }
        }
        callback(news)
    })
}


function Update(postId, newData, callback) {
    var updates = {};
    updates['/news/' + postId + "/title"] = newData.title;
    updates['/news/' + postId + "/content"] = newData.content;
    database.ref().update(updates, (err) => {
        callback(err);
    })
}

function Delete(postId, callback) {
    console.log("The id: " + postId)
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
