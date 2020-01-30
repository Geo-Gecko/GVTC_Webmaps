

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


// parks outside
var parks_outside = new L.GeoJSON(Parks_Outside, {
    style: {
        weight: 2,
        opacity: 1,
        color: '#808080',
        fillOpacity: 0,
        fillColor: '#808080'
    },
    onEachFeature: function (feature, layer) {
        layer.on('mouseover', function () {
            this.setStyle({
                weight: 2,
                opacity: 1,
                color: '#000000',
                fillOpacity: 0.0,
                fillColor: '#000000'
            });
        });
        layer.on('mouseout', function () {
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

parks_outside.eachLayer(function (layer) {
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

