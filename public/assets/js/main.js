function btnScrapeClick() {
    $.ajax({
        url: '/scrape',
        method: 'GET'
    }).then(function() {
        console.log("Ajax request promise execution");
    });
}

$(document).ready(function() {

    $('#btnScrape').on('click', btnScrapeClick);

});