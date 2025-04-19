mapboxgl.accessToken = mapToken;

const coordinates = listing.geometry.coordinates;

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12',
    center: coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 9 // starting zoom
});

console.log(listing.geometry.coordinates);

// Create a default Marker and add it to the map.
const marker1 = new mapboxgl.Marker({color:"red"})
.setLngLat(coordinates) // listing.geometry.coordinates
.setPopup(new mapboxgl.Popup({offset:25})
.setHTML(
    `<h4>${listing.title}</h4><p>Exact Location will be provided after booking</p>`
))
.addTo(map);



