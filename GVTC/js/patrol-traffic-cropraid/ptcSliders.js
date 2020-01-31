


//slider for the Traffic
let previous_slide = element => {
    var currentSlide = $(
        element
    ).parent().prev().children().children(".active-slide"),
        nextSlide = currentSlide.next();

    if (nextSlide.length === 0) {
        nextSlide = currentSlide.prev();
    }

    currentSlide.removeClass('active-slide');
    nextSlide.addClass('active-slide');

};

let next_slide = element => {
    var currentSlide = $(
        element
    ).parent().prev().children().children(".active-slide"),
        prevSlide = currentSlide.prev();


    if (prevSlide.length === 0) {
        prevSlide = currentSlide.next();
    }

    currentSlide.removeClass('active-slide');
    prevSlide.addClass('active-slide');
};

//sliders for the Patrol coverage
let previous_patrol_slides = element => {
    var currentSlides = $(
        element
    ).parent().prev().children(".active-slide"),
        nextSlides = $(
            element
        ).parent().prev().children().not(".active-slide");

    currentSlides.removeClass('active-slide');
    nextSlides.addClass('active-slide');

};

let next_patrol_slides = element => {
    var currentSlides = $(
        element
    ).parent().prev().children(".active-slide"),
        prevSlide = $(
            element
        ).parent().prev().children().not(".active-slide");

    currentSlides.removeClass('active-slide');
    prevSlide.addClass('active-slide');
};