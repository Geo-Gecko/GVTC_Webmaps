

var center = [-0.002060, 29.522247];

var stamenOptions = {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, ' +
    '<a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; ' +
    'Map data OpenStreetmap',
  subdomains: 'abcd',
  minZoom: 8
};

var toner = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012',
  subdomains: 'abcd',
  minZoom: 8,
  maxZoom: 8
});
var tonerLite = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: 'abcd',
  minZoom: 9,
});
var watercolor = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: 'abcd',
  minZoom: 9,
});

var map = L.map('map', {
  layers: [toner],
  center: center,
  zoom: 0
});

var mapA = L.map('mapA', {
  layers: [watercolor],
  center: center,
  zoom: 5
});
var mapB = L.map('mapB', {
  layers: [tonerLite],
  center: center,
  zoom: 5
});

// If you want interaction with mapA|B to be synchronized on map,
// add other links as well.

mapA.sync(mapB, {
});


mapB.sync(mapA, {
});


// add files from map2 folder to map2.html
[
  "styleMap2", "map2Panes", "mapA",
  "mapB", "mapLayerControl", "t1t2Datepickers"
].forEach(folder => {
  let hmap = document.createElement("script");
  hmap.setAttribute("type", "text/javascript");
  hmap.setAttribute("src", `js/map2/${folder}.js`);
  document.body.appendChild(hmap)
})


// add file from map folder to map2.html
let toolTips = document.createElement("script");
toolTips.setAttribute("type", "text/javascript");
toolTips.setAttribute("src", "js/map/toolTips.js");
document.body.appendChild(toolTips)


// add file from map folder to map2.html
let povertyLandCMap = document.createElement("script");
povertyLandCMap.setAttribute("type", "text/javascript");
povertyLandCMap.setAttribute("src", "js/map/povertyLandCMap.js");
document.body.appendChild(povertyLandCMap)

//leaflet legend containers
var legendFrom = $('.leaflet-top.leaflet-right');
var legendTo = $('#container22');
legendTo[0].appendChild(legendFrom[0]);

//cursor control
cursor1 = L.circleMarker([0, 0], { riseOnHover: true, radius: 25, fillOpacity: 0.1, color: '#1B6B36', fillColor: '#FFFFFF' });
cursor1.addTo(map);
mapA.createPane("cursorpane1");
mapA.getPane("cursorpane1").style.zIndex = 999;
cursor2 = L.circleMarker([0, 0], { pane: "cursorpane1",radius: 25, fillOpacity: 0.1, color: '#e31a1c', fillColor: '#FFFFFF' });
cursor2.addTo(mapA);
mapB.createPane("cursorpane2");
mapB.getPane("cursorpane2").style.zIndex = 999;
cursor3 = L.circleMarker([0, 0], { pane: "cursorpane2",radius: 25, fillOpacity: 0.1, color: '#e31a1c', fillColor: '#FFFFFF' });
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
    (checkbox.checked) ? layer.addTo(map) : map.removeLayer(layer);
  }
}
