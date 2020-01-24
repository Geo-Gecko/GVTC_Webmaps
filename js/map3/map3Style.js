


// Hide/show panel function for desktop view. The panel is shown by default.
var showPanel = true;
var collapsePanel = function () {
    if (showPanel === true) {
        $('div#panel').css('width', '35px');
        $('div#panelContent').css('opacity', '0');
        $('div#collapseBtn button').text('>>');
        showPanel = !showPanel;
    } else {
        $('div#panel').css('width', '300px');
        $('div#panelContent').css('opacity', '1');
        $('div#collapseBtn button').text('<<');
        showPanel = !showPanel;
    }
}

// Hide/show panel function for mobile view. The panel is not shown by default.
var showPanelXs = false;
var collapsePanelXs = function () {
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
var Conflict = L.geoJson(Conflict, {
    pane: 'conflictpane'
});

var pov = L.geoJson(poverty, {
    style: stylepoverty
});

var den = L.geoJson(density, {
    style: styledensity
});

var landcover = L.tileLayer.wms('https://geogecko.gis-cdn.net/geoserver/ows?', {
    layers: 'Olam_Vector:Landcover_2017',
    styles: '',
    transparent: true,
    format: 'image/png',
    pane: 'landcover'
});

var baseMaps = {
    "Household Poverty Rates": pov,
    "Population Density": den,
    "LandCover Classification": landcover
};

L.control.layers(baseMaps, "", {
    collapsed: false
}).addTo(map);
var legendFrom = $('.leaflet-control-layers');
var legendTo = $('#container2');
setParent(legendFrom[0], legendTo[0]);

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
        fillColor: getColordensity(feature.properties.pop_density),
        weight: 1,
        opacity: 1,
        color: 'black',
        dashArray: '0',
        fillOpacity: 1
    };
}
