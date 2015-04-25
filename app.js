var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//bookAPI is the db name in mongodb
var db = mongoose.connect('mongodb://localhost/bookAPI');

var Book = require('./models/bookModel');

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//execute the function 
bookRouter = require("./routes/bookRoutes")(Book);

app.use('/api/books', bookRouter);
// app.use('/api/author', authorRouter);

app.get('/', function(req, res){
	res.send("testing APIs");
});

app.listen(port, function(){
	console.log("i'm listening: " + port);
});