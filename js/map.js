function setParent(el, newParent) {
  newParent.appendChild(el);
}

var map = L.map('map').setView([-0.2, 29.24], 8);

var CartoDB_Positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: 'abcd',
}).addTo(map);


// Add specific classes to OpenLayers elements: hide these controls for mobile view using Bootstrap classes
$('.ol-scale-line').addClass('hidden-xs')
$('.ol-attribution').addClass('hidden-xs')

// Hide/show panel function for desktop view. The panel is shown by default.
var showPanel = true;
var collapsePanel = function() {
  if (showPanel === true) {
    $('div#panel').css('width', '35px');
    $('div#panelContent').css('opacity', '0');
    $('div#collapseBtn button').text('>');
    showPanel = !showPanel;
  } else {
    $('div#panel').css('width', '300px');
    $('div#panelContent').css('opacity', '1');
    $('div#collapseBtn button').text('<');
    showPanel = !showPanel;
  }
}

// Hide/show panel function for mobile view. The panel is not shown by default.
var showPanelXs = false;
var collapsePanelXs = function() {
  if (showPanelXs === true) {
    $('div#panel').css('width', '0px');
    $('div#panelContent').css('opacity', '0');
    showPanelXs = !showPanelXs;
  } else {
    $('div#panel').css('width', 'calc(100% - 45px)');
    $('div#panelContent').css('opacity', '1');
    $('div#navbar').removeClass('in')
    showPanelXs = !showPanelXs;
  }
}

// adding layers
map.createPane('conflictpane');
map.getPane('conflictpane').style.zIndex = 650;
var conflict = L.geoJson(Conflict, {
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

// parks
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

// landcover
map.createPane('landcover');
map.getPane('landcover').style.zIndex = 850;
var landcover = L.tileLayer.wms('https://geogecko.gis-cdn.net/geoserver/ows?', {
  layers: 'Olam_Vector:Landcover_2017',
  styles: '',
  transparent: true,
  format: 'image/png',
  pane: 'landcover'
});

// parks outside
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

// animals
map.createPane('elephantpane');
map.getPane('elephantpane').style.zIndex = 650;
var Elephant = L.geoJson(Elephant_habitat, {
  pane:'elephantpane',
  style: {
    weight: 2,
    opacity: 1,
    color: '#006400',
    fillOpacity: 0,
    fillColor: '#006400'
  }
});

function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}

map.createPane('gorillapane');
map.getPane('gorillapane').style.zIndex = 650;
var Gorilla = L.geoJson(Gorilla_habitat, {
  pane: 'gorillapane',
  style: {
    weight: 2,
    opacity: 1,
    color: '#FF0000',
    fillOpacity: 0,
    fillColor: '#FF0000'
  }
});

function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}

map.createPane('hippopane');
map.getPane('hippopane').style.zIndex = 650;
var geojsonMarkerOptions = {
  pane: 'hippopane',
  radius: 2,
  fillColor: "#07528B",
  color: "#000",
  weight: 0.6,
  opacity: 1,
  fillOpacity: 1
};

var Hip = L.geoJson(hippos, {
  pointToLayer: function(feature, latlng) {
    return L.circleMarker(latlng, geojsonMarkerOptions);
  },
  onEachFeature: function(features, featureLayer) {
    featureLayer.bindPopup(features.properties.Name);
    featureLayer.on('click', function(e) {
      map.setView(e.latlng, 8)
    });

  }
});

// layer control

var conflictlegend = L.control({position: 'bottomleft'});
conflictlegend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [1, 2, 3],
        labels = [],
        from, to;

    for (var i = 0; i < grades.length; i++) {
        from = grades[i];
        to = grades[i + 1];

        labels.push(
            '<i style="background:' + getColorconflict(from + 1) + '"></i> ' +
            from + (to ? '&ndash;' + to : '+'));
    }

    div.innerHTML = labels.join('<br>');
    return div;
};


 var povlegend = L.control({position: 'bottomleft'});
 povlegend.onAdd = function (map) {

     var div = L.DomUtil.create('div', 'info legend'),
         grades = [0.22, 0.18, 0.15, 0.11, 0.8],
         labels = [],
         from, to;

     for (var i = 0; i < grades.length; i++) {
         from = grades[i];
         to = grades[i + 1];

         labels.push(
             '<i style="background:' + getColorpoverty(from + 1) + '"></i> ' +
             from + (to ? '&ndash;' + to : '+'));
     }

     div.innerHTML = labels.join('<br>');
     return div;
 };

 var denlegend = L.control({position: 'bottomright'});
 denlegend.onAdd = function (map) {

     var div = L.DomUtil.create('div', 'info legend'),
         grades = [100, 200, 400, 9700],
         labels = [],
         from, to;

     for (var i = 0; i < grades.length; i++) {
         from = grades[i];
         to = grades[i + 1];

         labels.push(
             '<i style="background:' + getColordensity(from + 1) + '"></i> ' +
             from + (to ? '&ndash;' + to : '+'));
     }

     div.innerHTML = labels.join('<br>');
     return div;
 };

 map.on('baselayerchange', function (eventLayer) {
 if (eventLayer.name === 'Boundary Conflicts') {
  map.removeControl(povlegend || denlegend);
  conflictlegend.addTo(map);
 }
 else if  (eventLayer.name === 'Household Poverty Rates') {
  map.removeControl(conflictlegend || denlegend);
  povlegend.addTo(map);
 }
 else if  (eventLayer.name === 'Population Density') {
  map.removeControl(conflictlegend || povlegend);
  denlegend.addTo(map);
 }
 // else if  (eventLayer.name === 'Water') {
 //  map.removeControl(LISlegend || SGlegend || BUDlegend);
 //  VODlegend.addTo(map);
 // }
 })







var layMaps = {
  "Gorilla Habitat": Gorilla,
  "Hippos": Hip,
  "Elephant Habitat": Elephant
};
var baseMaps = {
  "Household Poverty Rates": pov,
  "Population Density": den,
  "LandCover Classification": landcover
};
var overlayMaps = {
  "Border Conflicts": conflict
};

L.control.layers( "", layMaps,{
  collapsed: false,
}).addTo(map);

var legendFrom = $('.leaflet-top.leaflet-right');
var legendTo = $('#container1');
setParent(legendFrom[0], legendTo[0]);

L.control.layers(baseMaps, overlayMaps,{
  collapsed: false,
}).addTo(map);

var legendFrom = $('.leaflet-bottom.leaflet-left');
var legendTo = $('#container2');
setParent(legendFrom[0], legendTo[0]);

function layer() {
  var layer = this;
  console.log(layer)
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
