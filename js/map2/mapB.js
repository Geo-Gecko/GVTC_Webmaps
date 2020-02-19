
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
var map_B_forest_tile = (year="2016") => L.tileLayer.wms('https://geogecko.gis-cdn.net/geoserver/ows?', {
  layers: 'olamMosaics:gvtc_data',
  styles: 'forestLoss',
  dim_location: `forestloss ${year} buffered.tif`,
  transparent: true,
  format: 'image/png',
  pane: 'deforestation'
});

let current_map_B_forest_tileObj = {"tile": map_B_forest_tile().addTo(mapB)};
