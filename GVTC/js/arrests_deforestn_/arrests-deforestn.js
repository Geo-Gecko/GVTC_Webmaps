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
        nextSlide = currentSlide.next(),
        currentDot = $('.active-dot'),
        nextDot = currentDot.next();

    if (nextSlide.length === 0) {
        nextSlide = $('.slide').first();
        nextDot = $('.dot').first();
    }

    currentSlide.fadeOut(600).removeClass('active-slide');
    nextSlide.fadeIn(600).addClass('active-slide');

    currentDot.removeClass('active-dot');
    nextDot.addClass('active-dot');
});

$('.arrow-prev').click(function () {
    var currentSlide = $('.active-slide'),
        prevSlide = currentSlide.prev(),
        currentDot = $('.active-dot'),
        prevDot = currentDot.prev();

    if (prevSlide.length === 0) {
        prevSlide = $('.slide').last();
        prevDot = $('.dot').last();
    }

    currentSlide.fadeOut(600).removeClass('active-slide');
    prevSlide.fadeIn(600).addClass('active-slide');

    currentDot.removeClass('active-dot');
    prevDot.addClass('active-dot');
});

// this bit will resize the sliders height to make it responsive
$(window).on('load resize', function () {
    var x = $('.active-slide img').height() + "px";

    $('.slider').css('min-height', x);
    $('p').text(x);
});

//this part will add a dot for each slider item, then assign a class name to the first child to get the active state
$('section').each(function () {
    var a = $('.slide').length;
    for (i = 0; i < a; i++) {
        $('.slider-dots').append('<li class="dot">&bull;</li>');
    }
});

$('.slider div:first').addClass('active-slide');
$('.slider-dots li:first').addClass('active-dot');

// here
hmap = document.createElement("script");
hmap.setAttribute("type", "text/javascript");
hmap.setAttribute("src", `js/arrests_deforestn_/arrests.js`);
document.body.appendChild(hmap)
