var firebase = require("firebase/app")

require("firebase/database")

var firebaseConfig = {
    apiKey: "AIzaSyAsTMmESGmIn3fx7i4IUrmwARc8EoUwf0Y",
    authDomain: "iadopt-159ff.firebaseapp.com",
    databaseURL: "https://iadopt-159ff.firebaseio.com",
    projectId: "iadopt-159ff",
    storageBucket: "",
    messagingSenderId: "705005534813",
    appId: "1:705005534813:web:96e980b96db033a3"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

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

function Retrieve(catId, callback) {
    database.ref('cats/' + catId).once('value').then(function(snapshot) {
        callback(snapshot.val())
    });
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
    Retrieve,
    Update,
    Delete
}
