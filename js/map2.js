window.onload = function(){
    // your JS here

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

var center = [-0.002060, 29.522247];

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


//calling density data from google sheets
var baseMaps = {}
var density;
let density_sheet = "251717838"
let long_id = "1-0V2d8gYHoCb7OZidsSBuVHfs30zaBW-sM6meBF02mw"
let url = `https://docs.google.com/spreadsheets/d/${long_id}/export?format=csv&id=${long_id}&gid=${density_sheet}`
axios.get(url, {
    mode: 'no-cors'
  })
  .then(r => {
    density_data = $.csv.toObjects(r.data),
      density_data.forEach(point => {
        popngeoJson_[point["NAME"]] = parseInt(point["pop_density"])
      })

//calling geosjon and style for density
    var den = L.geoJson(density, {
      style: styledensity
    })

//creating layer for density
    baseMaps["Population Density"] = den

  })
  .catch(e => console.log(e))

  //calling poverty data from google sheets
  let poverty_sheet = "2065427744"
  url = `https://docs.google.com/spreadsheets/d/${long_id}/export?format=csv&id=${long_id}&gid=${poverty_sheet}`
  axios.get(url, {
      mode: 'no-cors'
    })
    .then(r => {
      poverty_data = $.csv.toObjects(r.data),
        poverty_data.forEach(point => {
          povgeoJson[point["SNAME2014"]] = parseFloat(point["Poverty_5"])
        })

        //calling geosjon and style for poverty
        var pov = L.geoJson(poverty, {
          style: stylepoverty
        });

        //creating layer for poverty, landcover and conflicts
        baseMaps["Household Poverty Rates"] = pov
        baseMaps["LandCover Classification"] = landcover

        L.control.layers(baseMaps, "",  {
          collapsed: false,
        }).addTo(map);
    })
    .catch(e => console.log(e))

    window.onload = function(){
    //leaflet legend containers
    var legendFrom = $('.leaflet-top.leaflet-right');
    var legendTo = $('#container1');
    setParent(legendFrom[0], legendTo[0]);



    var legendFrom = $('.leaflet-bottom.leaflet-left');
    var legendTo = $('#container2');
    setParent(legendFrom[0], legendTo[0]);

    }

map.createPane('conflictpane');
map.getPane('conflictpane').style.zIndex = 650;
var Conflict = L.geoJson(Conflict, {
  pane:'conflictpane'
});

// var pov = L.geoJson(poverty, {
//   style: stylepoverty
// });

// var den = L.geoJson(density, {
//   style: styledensity
// });

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
  return d > 0.8  ? '#b30000' :
    d > 0.22  ? '#e34a33' :
    d > 0.18  ? '#fc8d59' :
    d > 0.15  ? '#fdbb84' :
    d > 0.11  ? '#fdd49e' :
    '#fef0d9';
}

function stylepoverty(feature) {
  return {
    fillColor: getColorpoverty(povgeoJson[feature.properties.SNAME2014]),
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
    fillColor: getColordensity(popngeoJson_[feature.properties.NAME]),
    weight: 1,
    opacity: 1,
    color: 'black',
    dashArray: '0',
    fillOpacity: 1
  };
}

// parks outside
map.createPane('outparksPane');
map.getPane('outparksPane').style.zIndex = 600;
var parks_outside = new L.GeoJSON(Parks_Outside, {
  pane: 'outparksPane',
  style: {
    weight: 2,
    opacity: 1,
    color: '#808080',
    fillOpacity: 0,
    fillColor: '#808080'
  },
  onEachFeature: function(feature, layer) {
    layer.on('mouseover', function() {
      this.setStyle({
        weight: 2,
        opacity: 1,
        color: '#000000',
        fillOpacity: 0.0,
        fillColor: '#000000'
      });
    });
    layer.on('mouseout', function() {
      this.setStyle({
        weight: 2,
        opacity: 1,
        color: '#808080',
        fillOpacity: 0,
        fillColor: '#808080'
      });
    });
  }
}).addTo(map);

parks_outside.eachLayer(function(layer) {
  layer.bindPopup('<strong>Name:</strong> ' + layer.feature.properties.NAME + ' ' + layer.feature.properties.DESIG + '<br>' + '<strong>Area(ha):</strong> ' + layer.feature.properties.Area_ha + '<br>' + '<strong>Start Year:</strong> ' + layer.feature.properties.STATUS_YR);
});

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

// parks
map.createPane('parksPane');
map.getPane('parksPane').style.zIndex = 600;
var parks = new L.GeoJSON(GVTC_parks, {
  pane: 'parksPane',
  style: {
    weight: 3,
    opacity: 1,
    color: '#a2d687',
    fillOpacity: 0,
    fillColor: '#a2d687'
  },
  onEachFeature: function(feature, layer) {
    layer.on('mouseover', function() {
      this.setStyle({
        weight: 2,
        opacity: 1,
        color: '#555',
        fillOpacity: 0,
        fillColor: '#555'
      });
    });
    layer.on('mouseout', function() {
      this.setStyle({
        weight: 3,
        opacity: 1,
        color: '#a2d687',
        fillOpacity: 0,
        fillColor: '#a2d687'
      });
    });
  }
}).addTo(map);
parks.eachLayer(function(layer) {
  layer.bindPopup('<strong>Name:</strong> ' + layer.feature.properties.NAME + ' ' + layer.feature.properties.DESIG +  '<br>' + '<strong>Area(ha):</strong> ' + layer.feature.properties.Area_ha + '<br>' + '<strong>Start Year:</strong> ' + layer.feature.properties.STATUS_YR);
});

// map A

L.geoJson(GVTC_parks).addTo(mapA);

var myStyle = {
  weight: 2,
  opacity: 1,
  color: '#a2d687',
  fillOpacity: 2.5,
  fillColor: '#a2d687'
};

L.geoJSON(GVTC_parks, {
  style: myStyle
}).addTo(mapA);

function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}

L.geoJson(waterbodies1,{
  style: {
    weight: 1,
    opacity: 1,
    color: '#d4dadc',
    fillOpacity: 1,
    fillColor: '#d4dadc'
  }
}).addTo(mapA);

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
  weight: 4,
  opacity: 2,
  color: '#a2d687',
  fillOpacity: 3.5,
  fillColor: '#a2d687'
};

L.geoJSON(GVTC_parks, {
  style: myStyle
}).addTo(mapB);

function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}

L.geoJson(waterbodies1,{
  style: {
    weight: 1,
    opacity: 1,
    color: '#d4dadc',
    fillOpacity: 1,
    fillColor: '#d4dadc'
  }
}).addTo(mapB);

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


  // layer control
  var povlegend = L.control({
    position: 'bottomright'
  });
  povlegend.onAdd = function(map) {

    var div = L.DomUtil.create('div', 'info legend'),
      povGrades = [0.11, 0.15, 0.18, 0.22, 0.8],
      povLabels = [],
      from, to;

    for (var i = 0; i < povGrades.length; i++) {
      from = povGrades[i];
      to = povGrades[i + 1];

      povLabels.push(
        '<i style="background:' + getColorpoverty(from) + '"></i> ' +
        from + (to ? '&ndash;' + to : '+'));

    }

    div.innerHTML = povLabels.join('<br>');
    return div;
  };

  var denlegend = L.control({
    position: 'bottomright'
  });
  denlegend.onAdd = function(map) {
    var div = L.DomUtil.create('div', 'info legend'),
      grades = [100, 200, 400, 9700],
      labels = [],
      from, to;

    for (var i = 0; i < grades.length; i++) {
      from = grades[i];
      to = grades[i + 1];

      labels.push(
        '<i style="background:' + getColordensity(from ) + '"></i> ' +
        from + (to ? '&ndash;' + to : '+'));;
    }

    div.innerHTML = labels.join('<br>');
    return div;
  };

  map.on('baselayerchange', function(eventLayer) {
  if (eventLayer.name === 'Household Poverty Rates') {
      map.removeControl(denlegend);
      povlegend.addTo(map);
    }
  else if (eventLayer.name === 'Population Density') {
      map.removeControl(povlegend);
      denlegend.addTo(map);
    }
  })

  //layer control 2
  var landLegend = L.control({position: 'bottomright'});
  landLegend.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'info legend');
      div.innerHTML +=
      '<img class= "landlegend" src="images/geoserver-GetLegendGraphic2.png" alt="legend">';
  return div;
  };

  map.on('baselayerchange', function(eventLayer) {
   if (eventLayer.name === 'LandCover Classification') {
      map.removeControl(denlegend||povlegend);
      landLegend.addTo(map);
    }
  })

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
