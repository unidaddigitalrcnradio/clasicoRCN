    var swiperCert = new Swiper('.certSlider', {
        slidesPerView: 5,
        paginationClickable: true,
        spaceBetween: 30,
        loop:true,
        autoplay: 4000,
        breakpoints: {
            768: {
                slidesPerView: 3,
                spaceBetween: 20
            },
            520: {
                slidesPerView: 2,
                spaceBetween: 10
            },
            400: {
                slidesPerView: 1,
                spaceBetween: 0
            },
        }
    }); 