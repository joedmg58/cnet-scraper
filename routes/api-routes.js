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
        $("div.col-4").each(function(i, element) {
          
          let articleItem = {};

          //grabbing text and href of every link
          articleItem.title = $(this).children("h3").children("a").text();
          articleItem.link = "https://www.cnet.com" + $(this).children("h3").children("a").attr("href");
          articleItem.text = $(this).children("p").children("a").text();

          articlesArr.push(articleItem);


          

        }); //end of $

        // If everything went ok, send handle bar object to user
        console.log("Rendering index...");
        console.log('------------------------------------------------------------------');

        var hbsObj = {
          articles: articlesArr
        }

        //var testObj = {message: 'Handlebar is working in api-routes...'}


        res.render("index", hbsObj);


    });

  });

  
  // Route for getting all Articles from the db
  app.get("/articles", function(req, res) {
  });
  
  
  // Route for saving/updating an Article's associated Note
  app.post("/articles", function(req, res) {
    //create a new article in mongoDB
    db.Article.create(req.data)
      .then(function(collArticle) {
        console.log(collArticle);
      })
      .catch(function(err) {
        return res.json(err);
      });
  });

}