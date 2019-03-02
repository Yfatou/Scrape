# Scrape
A responsive Node.js application that uses MongoDB and Cheerio to scrape a website.

## Description
This app scrapes the food section of the New york Times website.
It allows the user to save the scraped articles and to add, update or remove notes from the saved articles.


The app will work in two ways:
 - Scrapping the website and save desired articles.
 - Add personal notes to the saved articles.

Click here https://yfatou-scrape.herokuapp.com/ to access to the deployed version of the app.


## How to scrap the food section of the New York Times website!
Once on the homepage of the app, the user will click on the scrape button to start the scraping process.
Once the scraping done, the articles are displayed on the homepage. The title, a summary, a picture are displayed. A link to the full article is also displayed and redirect the user to te full article. A "Save" button is also available to the user to save the article if wanted.

![](scrape_demo1.gif)

Once the user saved the articles, a cick on the "saved articles" will display al the saved articles.
The user can now choose to delete the article from the saved page with a click on the "delete from saved" button  (This action will delete this article fro the saved articles and put it back in the homepage).
The user can also choose to add a note to a saved article by clicking on the "article notes" button.

![](scrape_demo2.gif)


## How is this app built
The app is built with HTML/CSS/Bootstrap and NodeJs.
It uses cheerio and axios too scrape the website.
The scraped datas are stores in a Mongo database.


## Technologies and npm packages used
 * Javascript
 * Node.js
 * Express
 * Handlebars.js
 * Express-handlebars
 * MomgoDB
 * Mongoose
 * Bootstrap
 * HTML
 * CSS
 * Cheerio
 

## How to setup the scrape app locally
To use this application from a local environment, the following steps will be necessary:
 
 1. Make sure that Node.js, npm and MongoDB are installed on your machine.

 2. Clone this repo using the command line on the terminal: __git clone https://github.com/Yfatou/Scrape.git

 3. Install all required NPM packages: __npm install__ 

 4. Start the application from the command line: __node server.js__


## Future developments
For the future, enhancements could be added to this application:
 * A "Clear articles" button to clear all the articles from the page
 



