//adding the map
var map = L.map('map', {
  minZoom: 8
}).setView([-0.3, 29.24], 8);

function setParent(el, newParent) {
  newParent.appendChild(el);
}

var toner = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012',
  subdomains: 'abcd',
  minZoom: 8,
  maxZoom: 8
}).addTo(map);


// parks
map.createPane('parksPane');
map.getPane('parksPane').style.zIndex = 600;
var parks = new L.GeoJSON(GVTC_parks, {
    pane: 'parksPane',
    style: {
        weight: 2,
        opacity: 1,
        color: '#4C9A2A',
        fillOpacity: 2.5,
        fillColor: '#4C9A2A'
    },
    onEachFeature: function (feature, layer) {
        layer.on('mouseover', function () {
            this.setStyle({
                weight: 2,
                opacity: 1,
                color: '#808080',
                fillOpacity: 10,
                fillColor: '#4C9A2A'
            });
        });
        layer.on('mouseout', function () {
            this.setStyle({
                weight: 1,
                opacity: 1,
                color: '#4C9A2A',
                fillOpacity: 1,
                fillColor: '#4C9A2A'
            });
        });
    }
}).addTo(map);
parks.eachLayer(function (layer) {
    layer.bindPopup('<strong>Name:</strong> ' + layer.feature.properties.NAME + ' ' + layer.feature.properties.DESIG + '<br>' + '<strong>Area(ha):</strong> ' + layer.feature.properties.Area_ha + '<br>' + '<strong>Start Year:</strong> ' + layer.feature.properties.STATUS_YR);
    layer.on('mouseover', function (e) {
               this.openPopup();
           });
           layer.on('mouseout', function (e) {
               this.closePopup();
           });
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
