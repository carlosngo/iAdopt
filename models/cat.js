const db = require("./db.js");
const database = db.database;

function Create(cat, callback) {
    let id = database.ref('cats/').push().key;
    database.ref('cats/' + id).set({
        "age": cat.age,
        "complications": cat.complications,
        "adoption": cat.adoption,
        "furPattern": cat.furPattern,
        "gender": cat.gender,
        "location": cat.location,
        "medProcedures": cat.medProcedures,
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

function RetrieveAll(filters, callback) {
    database.ref('cats').once('value').then(function(snapshot) {
        let cats = snapshot.val();
        let results = {};
        for (let cat in cats) {
            let saks = true;
            if (filters.location) {
                if (cats[cat].location != filters.location) saks = false;
            }
            if (filters.gender && saks) {
                if (cats[cat].gender != filters.gender) saks = false;
            }
            if (filters.furPattern && saks) {
                if (cats[cat].furPattern != filters.furPattern) saks = false;
            }
            if (filters.name && saks) {
                if (cats[cat].name.toLowerCase().includes(filters.name.toLowerCase())) saks = false;
            }
            if (filters.adoption && saks) {
                if (cats[cat].adoption != filters.adoption) saks = false;
            }
            if (filters.age && saks) {
                if (cats[cat].age != filters.age) saks = false;
            }
            if (saks) {
                results[cat] = cats[cat];
            }
        }
        callback(results);
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
