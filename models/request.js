const db = require("./db.js");
const database = db.database;

function Create(userRequest, callback) {
    let id = database.ref('requests/').push().key;
    database.ref('requests/' + id).set({
        "user": userRequest.user,
        "cat": userRequest.cat,
        "timestamp": "" + userRequest.timestamp.getTime(),
        "completed": userRequest.completed
    }, (err) => {
        callback(err);
    });
}

function RetrieveAll(callback) {
    database.ref('requests').once('value').then(function(snapshot) {
        let requests = snapshot.val();
        for (let request in requests) {
            requests[request].timestamp = new Date(parseInt(requests[request].timestamp))
        }
        callback(requests)
    })
}

function RetrieveOne(username, catId, callback) {
    database.ref('requests').once('value').then(function(snapshot) {
        let requests = snapshot.val();
        let request = null;
        for (let req in requests) {
            if (requests[req].user === username && requests[req].cat === catId) {
                request = requests[req];
                request.id = req;
                break;
            }
        }
        callback(request)
    })
}

function Delete(requestId, callback) {
    database.ref('requests/' + requestId).remove((err) => {
        callback(err);
    })
}

function Complete(requestId, callback) {
    database.ref('requests/' + requestId).once('value').then(function(snapshot) {
        let request = snapshot.val();
        let updates = {};
        updates['/requests/' + requestId + '/completed'] = !request.completed
        database.ref().update(updates, (err) => {
            callback(err);
        })
    })
}

module.exports = {
    Create,
    RetrieveOne,
    RetrieveAll,
    Delete,
    Complete
}
