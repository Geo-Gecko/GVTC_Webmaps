var center = [-0.002060, 29.392247];

var stamenOptions = {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, ' +
    '<a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; ' +
    'Map data OpenStreetmap',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20
};

var toner = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: 'abcd',
  minZoom: 8,
  maxZoom: 20
  // minZoom: 20
});
var tonerLite = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: 'abcd',
  minZoom: 8,
  maxZoom: 20
  // minZoom: 20
});
var watercolor = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: 'abcd',
  minZoom: 8,
  maxZoom: 20
  // minZoom: 20
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

map.sync(mapA, {
  syncCursor: true
});
map.sync(mapB, {
  syncCursor: true
});

// If you want interaction with mapA|B to be synchronized on map,
// add other links as well.
mapA.sync(map, {
  syncCursor: true
});
mapA.sync(mapB, {
  syncCursor: true
});

mapB.sync(map, {
  syncCursor: true
});
mapB.sync(mapA, {
  syncCursor: true
});
// map
map.createPane('conflictpane');
map.getPane('conflictpane').style.zIndex = 650;
var Conflict = L.geoJson(Conflict, {
  pane:'conflictpane'
});

var pov = L.geoJson(poverty, {
  style: stylepoverty
});

var den = L.geoJson(density, {
  style: styledensity
});

function getColorconflict(d) {
  return d > 1 ? '#b30000' :
    d > 2 ? '#e34a33' :
    d > 3 ? '#fc8d59' :
    '#fef0d9';
}

function styleconflict(feature) {
  return {
    fillColor: getColorconflict(feature.properties.conflict),
    weight: 1,
    opacity: 1,
    color: 'black',
    dashArray: '0',
    fillOpacity: 1
  };
}

function getColorpoverty(d) {
  return d > 0.22 ? '#b30000' :
    d > 0.18 ? '#e34a33' :
    d > 0.15 ? '#fc8d59' :
    d > 0.11 ? '#fdbb84' :
    d > 0.8 ? '#fdd49e' :
    '#fef0d9';
}

function stylepoverty(feature) {
  return {
    fillColor: getColorpoverty(feature.properties.Poverty_5),
    weight: 1,
    opacity: 1,
    color: 'black',
    dashArray: '0',
    fillOpacity: 1
  };
}

function getColordensity(d) {
  return d > 9700 ? '#e31a1c' :
    d > 400 ? '#fd8d3c' :
    d > 200 ? '#fecc5c' :
    d > 100 ? '#ffffb2' :
    '#fef0d9';
}

function styledensity(feature) {
  return {
    fillColor: getColordensity(feature.properties.pop_density),
    weight: 1,
    opacity: 1,
    color: 'black',
    dashArray: '0',
    fillOpacity: 1
  };
}

L.geoJson(Parks_Outside, {
  style: {
    weight: 2,
    opacity: 1,
    color: '#808080',
    fillOpacity: 0,
    fillColor: '#808080'
  }
}).addTo(map);

function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}

map.createPane('landcover');
map.getPane('landcover').style.zIndex = 850;
var landcover = L.tileLayer.wms('https://geogecko.gis-cdn.net/geoserver/ows?', {
  layers: 'Olam_Vector:Landcover_2017',
  styles: '',
  transparent: true,
  format: 'image/png',
  pane: 'landcover'
});

console.log(landcover)

map.createPane('parksPane');
map.getPane('parksPane').style.zIndex = 600;
L.geoJson(GVTC_parks,{
  pane: 'parksPane',
  style: {
    weight: 2,
    opacity: 1,
    color: '#72AC54',
    fillOpacity: 2.5,
    fillColor: '#72AC54'
  }
}).addTo(map);

// map A
L.geoJson(GVTC_parks).addTo(mapA);

var myStyle = {
  weight: 2,
  opacity: 1,
  color: '#72AC54',
  fillOpacity: 2.5,
  fillColor: '#72AC54'
};

L.geoJSON(GVTC_parks, {
  style: myStyle
}).addTo(mapA);

function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}

L.geoJson(Parks_Outside, {
  style: {
    weight: 2,
    opacity: 1,
    color: '#808080',
    fillOpacity: 0,
    fillColor: '#808080'
  }
}).addTo(mapA);

function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}

mapA.createPane('deforestation');
mapA.getPane('deforestation').style.ZIndex = 650;
var def = L.tileLayer.wms('https://geogecko.gis-cdn.net/geoserver/ows?', {
  layers: 'olamMosaics:gvtc_data',
  styles: 'forestLoss',
  dim_location: 'forestloss 2015 buffered.tif',
  transparent: true,
  format: 'image/png',
  pane: 'deforestation'
}).addTo(mapA);

// map B
L.geoJson(GVTC_parks).addTo(mapB);

var myStyle = {
  weight: 2,
  opacity: 1,
  color: '#72AC54',
  fillOpacity: 2.5,
  fillColor: '#72AC54'
};

L.geoJSON(GVTC_parks, {
  style: myStyle
}).addTo(mapB);

function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}

L.geoJson(Parks_Outside, {
  style: {
    weight: 2,
    opacity: 1,
    color: '#808080',
    fillOpacity: 0,
    fillColor: '#808080'
  }
}).addTo(mapB);

function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}

mapB.createPane('deforestation');
mapB.getPane('deforestation').style.ZIndex = 650;
var def = L.tileLayer.wms('https://geogecko.gis-cdn.net/geoserver/ows?', {
  layers: 'olamMosaics:gvtc_data',
  styles: 'forestLoss',
  dim_location: 'forestloss 2016 buffered.tif',
  transparent: true,
  format: 'image/png',
  pane: 'deforestation'
}).addTo(mapB);

var baseMaps = {
  "Household Poverty Rates": pov,
  "Population Density": den,
  "LandCover Classification": landcover
};
var layMaps = {
  "Boundary Conflicts": Conflict
};

L.control.layers( baseMaps, layMaps,{
  collapsed: false
}).addTo(map);
var legendFrom = $('.leaflet-control-layers');
var legendTo = $('#container2');
setParent(legendFrom[0], legendTo[0]);

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


