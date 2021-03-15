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