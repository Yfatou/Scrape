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
        result.link = $(this) // Add the 
          .find("a")
          .attr("href");
        result.summary = $(this)
          .find(".summary")
          .text()
          || $(this)
                .find("ul")
                .text();
        result.image = $(this)
          .find("a")
          .find("img")
          .attr("src");
        result.saved = false;

        // Create a new Article using the `result` object built from scraping
        db.Article.create(result)
          .then(function(dbArticle) {
            // View the added result in the console
            console.log("results" + dbArticle);
          })
          .catch(function(err) {
            // If an error occurred, log it
            console.log(err);
          });
      });
  
      // Send a message to the client
      res.send("Scrape Complete");
    });
  });


// A get Route to the articles in the database
// All articles in the database that aren't saved will be loaded 
app.get("/", function(req, res) {
  db.Article.find({saved: false})
  .then(function(dbArticle) {
    var hbsObject = {
      articles: dbArticle
    };
    res.render("index", hbsObject);
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


  // // Route for grabbing a specific Article by id, populate it with it's note
  app.get("/getNotes/:id", function(req, res) {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    db.Article.findOne({ _id: req.params.id })
      // ..and populate all of the notes associated with it
      .populate({
        path: "note",
        model: "Note"
      })
      .then(function(dbArticle) {
        // If we were able to successfully find an Article with the given id, send it back to the client
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });


  // Route to create or update a Note
  app.post("/articles/:id", function(req, res) {
    // Create a new note and pass the req.body to the entry
    console.log("in create note function");
    console.log(req.body);
    db.Note.create(req.body)
      .then(function(dbNote) {
        // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
        // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
        // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
        return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
      })
      .then(function(dbArticle) {
        // If we were able to successfully update an Article, send it back to the client
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });


  // Route to load the saved articles
  app.get("/saved", function(req, res) {
    db.Article
    .find({ saved: true })
    .then(function(dbArticles) {
      var hbsObject = {
        articles: dbArticles
      };
      res.render("saved", hbsObject);
    })
    .catch(function(err){
      res.json(err);
    });
  });

  // Route to unsave an article. 
  // This route will delete the article from the saved articles and update its saved value in the database
app.post("/deletesaved/:id", function(req, res) {
  db.Article
    .update({ _id: req.params.id }, { $set: {saved: false}})
    .then(function(dbArticle) {
      res.json("dbArticle");
    })
    .catch(function(err) {
      res.json(err);
    });
});


  module.exports = app;