//Setup modules
var flag = false;
var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require("body-parser");

//Setup app
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, "./")));
app.set('views', path.join(__dirname, './'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render("index");
})

app.get('/resume', function(req, res) {
    res.sendfile('./resume.pdf');
})

//Server
app.listen(80, function() {
    console.log("listening on port 80");
})
