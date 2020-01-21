
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

L.geoJson(waterbodies1, {
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
