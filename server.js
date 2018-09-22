/* Express Server for cnet-scraper application */
/* Joed Machado. UM Code Boot Camp 2018. */

// External modules required --------------------------------------------

var express = require("express"); //express server
var exphbs = require("express-handlebars"); //handlebars
var bodyParser = require("body-parser"); //body parser

var mongoose = require("mongoose"); //mongoose

var request = require("request"); //simplified HTTP client (scraping tool)
var cheerio = require("cheerio"); //like JQuery for server (scraping tool)

//var logger = require("morgan"); //for login requests

// end of external module required ----------------------------------------


// Require local modules      
var db = require("./models"); //all models

//Global vars
var PORT = process.env.PORT || 3000;
var dbName = "cnet-headlines";

// Initialize Express
var app = express();


// Use morgan logger for logging requests
//app.use(logger("dev"));

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));

// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

//set handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/" + dbName);

// Routes
require("./routes/api-routes")(app);
require("./routes/html-routes")(app);

// Start the server
app.listen(PORT, function() {
  console.log("App cnet-scraper running on port " + PORT + "!");
});
