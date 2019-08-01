const db = require("./db.js");
const database = db.database;

function Create(cat, callback) {
    let id = database.ref('cats/').push().key;
    database.ref('cats/' + id).set({
        "age": cat.age,
        "complications": cat.complications,
        "for-adoption": cat.forAdoption,
        "fur-ptn": cat.furPattern,
        "gender": cat.gender,
        "location": cat.location,
        "med-procedures": cat.medicalProcedures,
        "name": cat.name,
        "notes": cat.notes
    }, (err) => {
        callback(err);
    });
}

function RetrieveOne(catId, callback) {
    database.ref('cats/' + catId).once('value').then(function(snapshot) {
        callback(snapshot.val())
    });
}

function RetrieveAll(callback) {
    database.ref('cats').once('value').then(function(snapshot) {
        callback(snapshot.val());
    })
}


function Update(catId, newData, callback) {
    var updates = {};
    updates['/cats/' + catId] = newData;
    // will add more effects
    database.ref().update(updates, (err) => {
        callback(err);
    })
}

function Delete(catId, callback) {
    database.ref('cats/' + catId).remove((err) => {
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
