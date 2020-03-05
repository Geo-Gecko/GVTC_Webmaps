//forest loss in the parks
let forest_loss_sheet = "51326859"
let long_id = "1-0V2d8gYHoCb7OZidsSBuVHfs30zaBW-sM6meBF02mw"
let url = `https://docs.google.com/spreadsheets/d/${long_id}/export?format=csv&id=${long_id}&gid=${forest_loss_sheet}`

// add files from arrests_deforestn_ folder to arrests-deforestn.html
let hmap = document.createElement("script");
hmap.setAttribute("type", "text/javascript");
hmap.setAttribute("src", `js/arrests_deforestn_/forests.js`);
document.body.appendChild(hmap)


//slider for tables
$('.arrow-next').click(function () {
    var currentSlide = $('.active-slide'),
        nextSlide = currentSlide.next();

    if (nextSlide.length === 0) {
        nextSlide = $('.slide').first();
    }

    currentSlide.removeClass('active-slide');
    nextSlide.addClass('active-slide');

});

$('.arrow-prev').click(function () {
    var currentSlide = $('.active-slide'),
        prevSlide = currentSlide.prev();

    if (prevSlide.length === 0) {
        prevSlide = $('.slide').last();;
    }

    currentSlide.removeClass('active-slide');
    prevSlide.addClass('active-slide');

});

// this bit will resize the sliders height to make it responsive
$(window).on('load resize', function () {
    var x = $('.active-slide img').height() + "px";

    $('.slider').css('min-height', x);
    $('p').text(x);
});


hmap = document.createElement("script");
hmap.setAttribute("type", "text/javascript");
hmap.setAttribute("src", `js/arrests_deforestn_/arrests.js`);
document.body.appendChild(hmap)
