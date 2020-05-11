$( document ).ready( function () {
  const slider = new Swiper( '.projects__slider', {
    loop: true,
    slidesPerView: 3,
    wrapperClass: 'slider__view-area',
    slideClass: 'slider__item',
    spaceBetween: 30,

    navigation: {
      nextEl: '.slider__arrow--right',
      prevEl: '.slider__arrow--left',
    },

    autoplay: {
      delay: 3000,
    },

    pagination: {
      el: '.slider__item-control',
      type: 'bullets',
      bulletClass: 'item-control__dot',
      bulletActiveClass: 'item-control__dot--active',
    },

    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
      },

      460: {
        slidesPerView: 2,
        spaceBetween: 40,
      },

      1071: {
        slidesPerView: 3,
        spaceBetween: 30,
      }
    }

  } );
} );
