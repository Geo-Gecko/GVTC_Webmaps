
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
    return d > 0.8 ? '#b30000' :
        d > 0.22 ? '#e34a33' :
            d > 0.18 ? '#fc8d59' :
                d > 0.15 ? '#fdbb84' :
                    d > 0.11 ? '#fdd49e' :
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
        fillColor: getColordensity(popngeoJson_[feature.properties.NAME]),
        weight: 1,
        opacity: 1,
        color: 'black',
        dashArray: '0',
        fillOpacity: 1
    };
}
