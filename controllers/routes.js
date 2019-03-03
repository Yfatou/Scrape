// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");
var express = require("express");

// Require all models
var db = require("../models");

// Initialize Express
var app = express.Router();

// Routes

// A GET route for scraping the food setion of the new york times website
app.get("/scrape", function(req, res) {
    // First, we grab the body of the html with axios
    axios.get("https://www.nytimes.com/section/food").then(function(response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);
  
      // Now, we grab every article tag, and do the following:
      $("article").each(function(i, element) {
        // Save an empty result object
        var result = {};
  
        // Add the text and href of every link, and save them as properties of the result object
        result.title = $(this) //Add the text of the title
          .find("a")
          .text();
        result.link = $(this) // Add the link to the full article
          .find("a")
          .attr("href");
        result.summary = $(this) //Add the summary of the aricle
          .find(".summary") // Summaries on NYTimes website are sometimes under .summary
          .text()
          || $(this)
                .find("ul") // sometimes thne summaries are under an ul tag
                .text();
        result.image = $(this) // Add the image of the article
          .find("a")
          .find("img")
          .attr("src");
        result.saved = false; // The default value for saved is set to false

        // Create a new Article using the `result` object built from scraping
        db.Article.create(result)
          .then(function(dbArticle) {
            // Dispaly the results
            console.log("results" + dbArticle);
          })
          .catch(function(err) {
            console.log(err);
          });
      });
  
      // Send a message to the client
      res.send("Scrape Complete");
    });
  });


// A get Route to the articles in the database
app.get("/", function(req, res) {
  db.Article.find({saved: false})// All articles in the database that aren't saved will be loaded 
  .then(function(dbArticle) {
    var hbsObject = {
      articles: dbArticle
    };
    res.render("index", hbsObject);// Render them in the homepage
  }).catch(function(err) {
    res.json(err);
  });
});


// Route to save an article
app.post("/save/:id", function(req, res) {
  db.Article
  .update({ _id: req.params.id }, { $set: {saved: true}}) // Update the value of the variable saved
  .then(function(dbArticle) {
    res.json("dbArticle");
  })
  .catch(function(err) {
    res.json(err);
  });
});

// Route to load the saved articles
app.get("/saved", function(req, res) {
  db.Article
  .find({ saved: true }) // Look for all the articles with the value saved = true
  .then(function(dbArticles) {
    var hbsObject = {
      articles: dbArticles
    };
    res.render("saved", hbsObject);// Render them in the saved page
  })
  .catch(function(err){
    res.json(err);
  });
});

  // Route to unsave an article. 
  // This route will delete the article from the saved articles and update its saved value in the database
app.post("/deletesaved/:id", function(req, res) {
  db.Article
    .update({ _id: req.params.id }, { $set: {saved: false}})// update the saved value to false
    .then(function(dbArticle) {
      res.json("dbArticle");
    })
    .catch(function(err) {
      res.json(err);
    });
});


//Route to retrieve all the notes for an article
app.get("/articles/:id", function (req,res){
  db.Article.findOne({ _id: req.params.id })// Find the article with the given Id
    .populate("note") // Populate all the notes
    .then(function(dbArticle){ // If an article is found
      res.json(dbArticle); // send it to the client
    })
    .catch(function(err){
      res.json(err);
    });
});

//Route to create/update an article's associated note in the database
app.post("/articles/:id", function (req,res){
  db.Note.create(req.body) // Create a new note with the req.body as an entry
    .then(function(dbNote){
      return db.Article.findOneAndUpdate( {_id: req.params.id }, { note: dbNote._id }, { new:true });//saving reference to note in corresponding article
    })
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

  module.exports = app;