

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
