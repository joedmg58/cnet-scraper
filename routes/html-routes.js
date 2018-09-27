var path = require("path");


module.exports = function(app) {

    var testObj = {message: 'Handlebar is working in html-route...'}
  
    // Load index page
    app.get("/", function(req, res) {
        res.render( 'index', {});   // testObj for testing handlebars
    });

    // Load saved article page
    app.get("/saved", function(req, res) {
        res.render( 'saved', {});
    });

}
