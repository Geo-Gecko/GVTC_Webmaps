
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
    onEachFeature: function (feature, layer) {
        layer.on('mouseover', function () {
            this.setStyle({
                weight: 2,
                opacity: 1,
                color: '#808080',
                fillOpacity: 10,
                fillColor: '#a2d687'
            });
        });
        layer.on('mouseout', function () {
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
