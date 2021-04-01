 // Initialize google map
 let map;

 function initMap() {
	 map = new google.maps.Map(document.getElementById("map"), {
		 center: { lat: 55.72078349376917, lng: 37.63271754923085 },
		 zoom: 15,
		 styles: dataMap,
		 disableDefaultUI: true,
		 scaleControl: false,
	 });

	markerImage = new google.maps.MarkerImage('images/show/map_marker.svg',
								new google.maps.Size(80, 80),
								new google.maps.Point(0, 0),
								new google.maps.Point(40, 40));

	 initZoomControl(map);
	 const marker = new google.maps.Marker({
		 position: new google.maps.LatLng(55.72078349376917, 37.63271754923085),
		 map: map,
		 icon: markerImage,
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