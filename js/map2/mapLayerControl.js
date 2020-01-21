

// layer control
var povlegend = L.control({
    position: 'bottomright'
});
povlegend.onAdd = function (map) {

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
denlegend.onAdd = function (map) {
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

map.on('baselayerchange', function (eventLayer) {
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
var landLegend = L.control({ position: 'bottomright' });
landLegend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML +=
        '<img class= "landlegend" src="images/geoserver-GetLegendGraphic2.png" alt="legend">';
    return div;
};

map.on('baselayerchange', function (eventLayer) {
    if (eventLayer.name === 'LandCover Classification') {
        map.removeControl(denlegend || povlegend);
        landLegend.addTo(map);
    }
})
