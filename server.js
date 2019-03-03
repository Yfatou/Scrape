//Dependencies
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var path = require("path");

var PORT = process.env.PORT || 3000;

var routes = require("./controllers/routes");


// Initialize Express
var app = express();

app.use(routes);

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// Configure middleware
// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Set Handlebars.
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(routes);


// Connect to the Mongo DB
//mongoose.connect("mongodb://localhost/mongoheadlines", { useNewUrlParser: true });
mongoose.connect("mongodb://localhost/mongoheadlines");

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
