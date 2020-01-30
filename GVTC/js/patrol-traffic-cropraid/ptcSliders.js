


//slider for the Patrol Coverage
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
