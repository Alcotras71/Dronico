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

// Initialize google map
let map;
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 55.72078349376917, lng: 37.63271754923085 },
		zoom: 15,
		styles: [{"featureType":"all","elementType":"all","stylers":[{"visibility":"simplified"},{"hue":"#bc00ff"},{"saturation":"0"}]},{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#e8b8f9"}]},{"featureType":"administrative.country","elementType":"labels","stylers":[{"color":"#ff0000"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"visibility":"simplified"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#3e114e"},{"visibility":"simplified"}]},{"featureType":"landscape","elementType":"labels","stylers":[{"visibility":"off"},{"color":"#a02aca"}]},{"featureType":"landscape.natural","elementType":"all","stylers":[{"visibility":"simplified"},{"color":"#2e093b"}]},{"featureType":"landscape.natural","elementType":"labels.text","stylers":[{"color":"#9e1010"},{"visibility":"off"}]},{"featureType":"landscape.natural","elementType":"labels.text.fill","stylers":[{"color":"#ff0000"}]},{"featureType":"landscape.natural.landcover","elementType":"all","stylers":[{"visibility":"simplified"},{"color":"#58176e"}]},{"featureType":"landscape.natural.landcover","elementType":"labels.text.fill","stylers":[{"visibility":"simplified"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road","elementType":"geometry","stylers":[{"visibility":"simplified"},{"color":"#a02aca"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#d180ee"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"visibility":"simplified"},{"color":"#a02aca"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"off"},{"color":"#ff0000"}]},{"featureType":"road.highway","elementType":"labels.text","stylers":[{"color":"#a02aca"},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#cc81e7"},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"labels.text.stroke","stylers":[{"visibility":"simplified"},{"hue":"#bc00ff"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#6d2388"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#c46ce3"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#b7918f"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#280b33"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"simplified"},{"color":"#a02aca"}]}],
		disableDefaultUI: true,
		scaleControl: false,
	});
	initZoomControl(map);
	const marker = new google.maps.Marker({
		position: new google.maps.LatLng(55.72078349376917, 37.63271754923085),
		map: map,
		icon: '../images/show/map_marker.svg'
	});
}

function initZoomControl(map) {
  document.querySelector(".map__zoom-plus").onclick = function () {
    map.setZoom(map.getZoom() + 1);
  };
  document.querySelector(".map__zoom-minus").onclick = function () {
    map.setZoom(map.getZoom() - 1);
  };
}