const express = require("express");
const bodyparser = require("body-parser");
const urlencoder = bodyparser.urlencoded({
    extended:false
});
const app = express();

app.get("/", function(request, response){
    response.sendFile(__dirname + "/html/home.html");
})

app.post("/login", urlencoder, function(request, response){
    
})