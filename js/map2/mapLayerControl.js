

// layer control
var povlegend = L.control({
    position: 'bottomright'
});
var denlegend = L.control({
  position: 'bottomright'
});
var landLegend = L.control({ position: 'bottomright' });
povlegend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        povGrades = [0.11, 0.15, 0.18, 0.22, 0.8],
        povLabels = ['<strong>1 = Highest Level of Poverty </strong> <br>'],
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


denlegend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [100, 200, 400, 9700],
        labels = ['<strong> People/Sqkm </strong><br>'],
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


//layer control 2
landLegend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML +=
        '<img class= "landlegend" src="images/geoserver-GetLegendGraphic2.png" alt="legend">';
    return div;
};

map.on('baselayerchange', function (eventLayer) {
  if (eventLayer.name === 'Household Poverty Rates') { 
    if(landLegend._map) {
      map.removeControl(landLegend);
    } else if(denlegend._map) {
      map.removeControl(denlegend);
    }
    povlegend.addTo(map);
  }
  else if (eventLayer.name === 'Population Density') { 
    if(landLegend._map) {
      map.removeControl(landLegend);
    } else if(povlegend._map) {
      map.removeControl(povlegend);
    }
    denlegend.addTo(map);
  }
  if (eventLayer.name === 'LandCover Classification') { 
    if(denlegend._map) {
      map.removeControl(denlegend);
    } else if(povlegend._map) {
      map.removeControl(povlegend);
    }
    landLegend.addTo(map);
  }
})
