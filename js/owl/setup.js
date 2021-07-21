$('.owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    nav: false,
    stagePadding: 0,
    dots: false,
    responsive: {
        0: {
            items: 3
        },
        600: {
            items: 4
        },
        1000: {
            items: 6
        }
    }
})