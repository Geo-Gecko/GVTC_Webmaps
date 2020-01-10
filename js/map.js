//adding the map
var map = L.map('map', {
  minZoom: 8
}).setView([-0.2, 29.24], 8);


function setParent(el, newParent) {
  newParent.appendChild(el);
}

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

//adding the geojsons
var geoJson_;
let popngeoJson_ = {};
let povgeoJson = {};
let congeoJson = {};

//calling hippos from google sheets
var baseMaps = {}
var density;
let hip_sheet = "1478917428"
let long_id = "1-0V2d8gYHoCb7OZidsSBuVHfs30zaBW-sM6meBF02mw"
let url = `https://docs.google.com/spreadsheets/d/${long_id}/export?format=csv&id=${long_id}&gid=${hip_sheet}`
axios.get(url, {
    mode: 'no-cors'
  })
  .then(r => {
    hippos4 = $.csv.toObjects(r.data)
    var jsonFeatures = [];
    hippos4.forEach(hippo => {
      var feature = {
        type: 'Feature',
        properties: hippo,
        geometry: {
          type: 'Point',
          coordinates: [hippo['X Value'], hippo['Y Value']]
        }
      }
      jsonFeatures.push(feature)
    })

    geoJson_ = {
      type: 'FeatureCollection',
      name: 'hippos2',
      features: jsonFeatures
    };
    ready(geoJson_)
  })
  .catch(e => console.log(e))

//calling density data from google sheets
let density_sheet = "251717838"
url = `https://docs.google.com/spreadsheets/d/${long_id}/export?format=csv&id=${long_id}&gid=${density_sheet}`
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

  //calling conflict data from google sheets
  let conflict_sheet = "990779069"
  url = `https://docs.google.com/spreadsheets/d/${long_id}/export?format=csv&id=${long_id}&gid=${conflict_sheet}`
  axios.get(url, {
      mode: 'no-cors'
    })
    .then(r => {
      conflict_data = $.csv.toObjects(r.data),
        conflict_data.forEach(point => {
          congeoJson[point["Name"]] = parseFloat(point["conflict"])
        })

        //calling geosjon and style for conflict
        map.createPane('conflictpane');
        map.getPane('conflictpane').style.zIndex = 650;
        var conflict = L.geoJson(Conflict, {
          pane: 'conflictpane'
        });

        //creating layer for conflicts
        var layMaps = {
          "Boundary Conflicts": conflict
        };

              L.control.layers("", layMaps, {
                collapsed: false,
              }).addTo(map);


    })
    .catch(e => console.log(e))

// styles for the geojosns
function getColorconflict(d) {
  return d > 1 ? '#b30000' :
    d > 2 ? '#e34a33' :
    d > 3 ? '#fc8d59' :
    '#fef0d9';
}

function getColorpoverty(d) {
  return d > 0.8 ? '#b30000' :
    d > 0.22 ? '#e34a33' :
    d > 0.18 ? '#fc8d59' :
    d > 0.15 ? '#fdbb84' :
    d > 0.11 ? '#fdd49e' :
    '#fef0d9';
}

function getColordensity(d) {
  return d > 9700 ? '#e31a1c' :
    d > 400 ? '#fd8d3c' :
    d > 200 ? '#fecc5c' :
    d > 100 ? '#ffffb2' :
    '#fef0d9';
}

// parks
map.createPane('parksPane');
map.getPane('parksPane').style.zIndex = 600;
var parks = new L.GeoJSON(GVTC_parks, {
  pane: 'parksPane',
  style: {
    weight: 2,
    opacity: 1,
    color: '#a2d687',
    fillOpacity: 2.5,
    fillColor: '#a2d687'
  },
  onEachFeature: function(feature, layer) {
    layer.on('mouseover', function() {
      this.setStyle({
        weight: 2,
        opacity: 1,
        color: '#a2d687',
        fillOpacity: 0.0,
        fillColor: '#a2d687'
      });
    });
    layer.on('mouseout', function() {
      this.setStyle({
        weight: 1,
        opacity: 1,
        color: '#a2d687',
        fillOpacity: 1,
        fillColor: '#a2d687'
      });
    });
  }
}).addTo(map);
parks.eachLayer(function(layer) {
  layer.bindPopup('<strong>Name:</strong> ' + layer.feature.properties.NAME + ' ' + layer.feature.properties.DESIG + '<br>' + '<strong>Area(ha):</strong> ' + layer.feature.properties.Area_ha + '<br>' + '<strong>Start Year:</strong> ' + layer.feature.properties.STATUS_YR);
});

// waterbodies
map.createPane('waterPane');
map.getPane('waterPane').style.zIndex = 600;
L.geoJson(waterbodies1, {
  pane: 'waterPane',
  style: {
    weight: 1,
    opacity: 1,
    color: '#d4dadc',
    fillOpacity: 1,
    fillColor: '#d4dadc'
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
var parks_outside = new L.GeoJSON(Parks_Outside, {
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

//calling the styles that power the geojsons
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

function styleconflict(feature) {
  return {
    fillColor: getColorconflict(feature.properties.Name),
    weight: 1,
    opacity: 1,
    color: 'black',
    dashArray: '0',
    fillOpacity: 1
  };
}

function ready(geoJson_) {
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

//adding the hippos layer
  var Hip = L.geoJson(geoJson_, {
    pointToLayer: function(feature, coordinates) {
      return L.circleMarker(coordinates, geojsonMarkerOptions);
    },

  });

  var overlayMaps = {
    // "Gorilla Habitat": Gorilla,
    "Hippos": Hip
    // "Elephant Habitat": Elephant
  };

  L.control.layers("", overlayMaps, {
    collapsed: false,
  }).addTo(map);
}


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
      '<i style="background:' + getColordensity(from) + '"></i> ' +
      from + (to ? '&ndash;' + to : '+'));;
  }

  div.innerHTML = labels.join('<br>');
  return div;
};

map.on('baselayerchange', function(eventLayer) {
  if (eventLayer.name === 'Household Poverty Rates') {
    map.removeControl(denlegend);
    povlegend.addTo(map);
  } else if (eventLayer.name === 'Population Density') {
    map.removeControl(povlegend);
    denlegend.addTo(map);
  }
})

//layer control 2
var landlegend = L.control({
  position: 'bottomright'
});
landlegend.onAdd = function(map) {
  var div = L.DomUtil.create('div', 'info legend');
  div.innerHTML +=
    '<img class= "landlegend" src="images/geoserver-GetLegendGraphic.png" alt="legend">';
  return div;
};

map.on('baselayerchange', function(eventLayer) {
  if (eventLayer.name === 'LandCover Classification') {
    map.removeControl(denlegend || povlegend);
    landlegend.addTo(map);
  }
})

//leaflet legend containers
var legendFrom = $('.leaflet-top.leaflet-right');
var legendTo = $('#container1');
setParent(legendFrom[0], legendTo[0]);

var legendFrom = $('.leaflet-bottom.leaflet-left');
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
