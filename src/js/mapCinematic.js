// Initialize google map
let map;

function initMap() {
  const dataMap = [
    {
      featureType: "administrative",
      elementType: "all",
      stylers: [{ visibility: "simplified" }],
    },
    {
      featureType: "administrative",
      elementType: "labels.text.fill",
      stylers: [{ color: "#ffffff" }],
    },
    {
      featureType: "administrative.country",
      elementType: "labels",
      stylers: [{ color: "#ff0000" }],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "labels.text.fill",
      stylers: [{ visibility: "simplified" }],
    },
    {
      featureType: "landscape",
      elementType: "geometry",
      stylers: [
        {
          color: "#580623",
        },
      ],
    },
    {
      featureType: "landscape",
      elementType: "labels",
      stylers: [
        {
          color: "#1e242b",
        },
        {
          lightness: "30",
        },
      ],
    },
    {
      featureType: "landscape",
      elementType: "labels.text.stroke",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [
        {
          color: "#580623",
        },
        {
          lightness: "-25",
        },
        {
          gamma: "1",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [
        {
          color: "#1e242b",
        },
        {
          lightness: "30",
        },
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text.stroke",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          visibility: "simplified",
        },
        {
          color: "#f5005a",
        },
        {
          lightness: "-40",
        },
        {
          saturation: "0",
        },
        {
          gamma: "1",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "all",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [
        {
          color: "#1e242b",
        },
        {
          lightness: "6",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "labels",
      stylers: [
        {
          color: "#1e242b",
        },
        {
          lightness: "30",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "labels.text.stroke",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          color: "#45051C",
        },
        {
          lightness: "0",
        },
        {
          gamma: "1",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
  ];

  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 55.72078349376917, lng: 37.63271754923085 },
    zoom: 15,
    styles: dataMap,
    disableDefaultUI: true,
    scaleControl: false,
  });

  initZoomControl(map);
  const marker = new google.maps.Marker({
    position: new google.maps.LatLng(55.72078349376917, 37.63271754923085),
    map: map,
    icon: {
      url: "images/cinematic/map_marker.svg",
      anchor: new google.maps.Point(40, 40),
    },
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
