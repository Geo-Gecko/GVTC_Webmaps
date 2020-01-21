window.onload = function(){
    // your JS here
    // this might have no functionality
function setParent(el, newParent) {
  newParent.appendChild(el);
}

}

$(function() {
    $( "#selector_menu" ).datepicker({
        altField: "#alternate",
        altFormat: "DD, d MM, yy"
    });
});

var center = [-0.002060, 29.122247];

var stamenOptions = {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, ' +
    '<a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; ' +
    'Map data OpenStreetmap',
  subdomains: 'abcd',
  minZoom: 8
};

var toner= L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012',
  subdomains: 'abcd',
  minZoom: 8
});
var tonerLite = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: 'abcd',
  minZoom: 8
});
var watercolor = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: 'abcd',
  minZoom: 8
});

var map = L.map('map', {
  layers: [toner],
  center: center,
  zoom: 1
});

var mapA = L.map('mapA', {
  layers: [watercolor],
  center: center,
  zoom: 1,
  zoomControl: false
});
var mapB = L.map('mapB', {
  layers: [tonerLite],
  center: center,
  zoom: 1,
  zoomControl: false
});

// If you want interaction with mapA|B to be synchronized on map,
// add other links as well.

mapA.sync(map, {
});
mapA.sync(mapB, {
});

mapB.sync(map, {
});
mapB.sync(mapA, {
});

map.sync(mapA, {
});
map.sync(mapB, {
});

// map
//adding the geojsons
let popngeoJson_ = {};
let povgeoJson = {};


["map2a", "styleMap2", "map2Panes", "mapA", "mapB", "mapLayerControl"].forEach(layer => {
  let hmap = document.createElement("script");
  hmap.setAttribute("type", "text/javascript");
  hmap.setAttribute("src", `js/map/${layer}.js`);
  document.body.appendChild(hmap)
})

// var pov = L.geoJson(poverty, {
//   style: stylepoverty
// });

// var den = L.geoJson(density, {
//   style: styledensity
// });


//cursor control
cursor1 = L.circleMarker([0,0], {riseOnHover: true, radius:25, fillOpacity: 0.1, color: '#e31a1c', fillColor: '#FFFFFF'});
cursor1.addTo(map);
cursor2 = L.circleMarker([0,0], {radius:25, fillOpacity: 0.1, color: '#e31a1c', fillColor: '#FFFFFF'});
cursor2.addTo(mapA);
cursor3 = L.circleMarker([0,0], {radius:25, fillOpacity: 0.1, color: '#e31a1c', fillColor: '#FFFFFF'});
cursor3.addTo(mapB);

map.on('mousemove', function (e) {
   cursor1.setLatLng(e.latlng);
   cursor2.setLatLng(e.latlng);
   cursor3.setLatLng(e.latlng);
 });
mapA.on('mousemove', function (e) {
   cursor1.setLatLng(e.latlng);
   cursor2.setLatLng(e.latlng);
   cursor3.setLatLng(e.latlng);
 });
mapB.on('mousemove', function (e) {
    cursor1.setLatLng(e.latlng);
    cursor2.setLatLng(e.latlng);
    cursor3.setLatLng(e.latlng);
  });


// var baseMaps = {
//   "Household Poverty Rates": pov,
//   // "Population Density": den,
//   "LandCover Classification": landcover
// };
// // var layMaps = {
// //   "Border Conflicts": Conflict
// // };
//
// L.control.layers( baseMaps, "",{
//   collapsed: false
// }).addTo(map);

function layer() {
  var layer = this;
  var name = layer.getGeoJSON().name;
  var item = filters.appendChild(document.createElement('div'));
  var checkbox = item.appendChild(document.createElement('input'));
  var label = item.appendChild(document.createElement('label'));
  checkbox.type = 'checkbox';
  checkbox.id = name;
  label.innerHTML = name;
  label.setAttribute('for', name);
  checkbox.addEventListener('change', update);

  function update() {
    (checkbox.checked) ? layer.addTo(map): map.removeLayer(layer);
  }
}
