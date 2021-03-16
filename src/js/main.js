// initialize using-areas-slider
const usingAreas = new Swiper('.using-card__container', {
  speed: 400,
	spaceBetween: 10,
	slidesPerView: 4,
	loop: true,
	navigation: {
    nextEl: '.using-areas__pagination-next',
    prevEl: '.using-areas__pagination-prev',
  },
});

// Initialize dronico slider
const dronicoSlider = new Swiper('.dronico-slider__container', {
	speed: 400,
	slidesPerView: 1,
	loop: true,
	navigation: {
    nextEl: '.dronico-slider__pagination-next',
    prevEl: '.dronico-slider__pagination-prev',
  },
});

// Initialize work slider
const workSlider = new Swiper('.work__container', {
	speed: 400,
	slidesPerView: 6,
	spaceBetween: 23,
	navigation: {
		nextEl: '.work__navigation-next',
		prevEl: '.work__navigation-prev'
	}
})