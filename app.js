var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/views/css'));


app.get('/', function(req, res) {
    res.render("search");
});


app.get('/results', function(req, res) {
    var query = req.query.search;
    searchTerm = query.replace(/\s/g, '_');
    request("http://omdbapi.com/?s=" + searchTerm + "&apikey=db437c0", function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            res.render("results", { data: data });

        }

    });
});

app.listen(3000, function() {
    console.log("Server has started.");
});