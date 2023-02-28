// RENDERING A MAP SCRIPT:

mapboxgl.accessToken = mapToken; //mapToken variable found as a script on showpage template
const map = new mapboxgl.Map({
    container: 'map', // container ID needs to match the div id in "Map Display"
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [-74.5, 40], // starting position [longtitude, latitude]
    zoom: 9, // starting zoom
});

new mapboxgl.Marker()
    .setLngLat([-74.5, 40])
    .addTo(map);