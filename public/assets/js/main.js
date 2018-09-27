function btnScrapeClick() {
    $.ajax({
        url: '/scrape',
        method: 'GET'
    }).then(function() {
        console.log("Ajax request promise execution");
    });
}

function btnSaveClick(event) {
    //console.log( event );
    //console.log( this );

    // grab article info
    var article = {
        title: $(this).attr('data-title'),
        link: $(this).attr('data-link'),
        text: $(this).attr('data-text')
    }

    //save article in database


    //set saved badge  visible
    $( '#span'+$(this).attr('data-index') ).toggle();
}

$(document).ready(function() {

    // Button scrape event listener
    $('#btnScrape').on('click', btnScrapeClick);

    // Button save article event listener
    $('.btnSaveArticle').on('click', btnSaveClick);


});