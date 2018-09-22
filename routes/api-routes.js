var request = require("request"); //simplified HTTP client (scraping tool)
var cheerio = require("cheerio"); //like JQuery for server (scraping tool)
var db = require("../models");

module.exports = function(app) {

// A GET route for scraping the cnet.com site
app.get("/scrape", function(req, res) {
    // First, we grab the body of the html with request
    request("https://www.cnet.com/", function(error, response, body) {
      console.log('error: ', error);
      console.log('statusCode: ', response && response.statusCode);
      //console.log(body);

        var $ = cheerio.load(body);

        //create empty result object
        var articlesArr = [];

        //Now, we grab every ...
        //$("latestScrollItems item rlLine col-4 h3").each(function(i, element) {
        $("div.col-4 h3").each(function(i, element) {
          
          let articleItem = {};

          //grabbing text and href of every link
          articleItem.title = $(this).children("a").text();
          articleItem.link = $(this).children("a").attr("href");

          articlesArr.push(articleItem);

          //console.log(articleItem);
          //console.log('------------------------------------------------------------------');

          /* //create a new article in mongoDB
          db.Article.create(result)
            .then(function(collArticle) {
              console.log(collArticle);
            })
            .catch(function(err) {
              return res.json(err);
            }); */

        });

        // If everything went ok, send handle bar object to user
        console.log("Rendering index...");
        console.log('------------------------------------------------------------------');

        var hbsObj = {
          articles: articlesArr
        }

        var testObj = {test_message: 'Handlebar is working...'}

        console.log(testObj);
        console.log('------------------------------------------------------------------');

        res.render("index", testObj);


    });

  });

  
  // Route for getting all Articles from the db
  app.get("/articles", function(req, res) {
    // TODO: Finish the route so it grabs all of the articles
  });
  
  // Route for grabbing a specific Article by id, populate it with it's note
  app.get("/articles/:id", function(req, res) {
    // TODO
    // ====
    // Finish the route so it finds one article using the req.params.id,
    // and run the populate method with "note",
    // then responds with the article with the note included
  });
  
  // Route for saving/updating an Article's associated Note
  app.post("/articles/:id", function(req, res) {
    // TODO
    // ====
    // save the new note that gets posted to the Notes collection
    // then find an article from the req.params.id
    // and update it's "note" property with the _id of the new note
  });

}