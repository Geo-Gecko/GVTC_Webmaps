//adding the map
var map = L.map('map', {
  minZoom: 8
}).setView([-0.2, 29.24], 8);


function setParent(el, newParent) {
  newParent.appendChild(el);
}

var CartoDB_Positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: 'abcd',
}).addTo(map);


// add files from map folder to map1.html
["toolTips", "povertyLandCMap", "mapPanes", "styleMap"].forEach(folder => {
  let hmap = document.createElement("script");
  hmap.setAttribute("type", "text/javascript");
  hmap.setAttribute("src", `js/map/${folder}.js`);
  document.body.appendChild(hmap)
})

// layer control
var povlegend = L.control({
  position: 'bottomright'
});
povlegend.onAdd = function(map) {

  var div = L.DomUtil.create('div', 'info legend'),
    povGrades = [0.11, 0.15, 0.18, 0.22, 0.8],
    povLabels = ['<strong>1 = Max Level of Poverty </strong> <br>'],
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

//layer control 2
var landlegend = L.control({
  position: 'bottomright'
});


denlegend.onAdd = function(map) {
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

landlegend.onAdd = function(map) {
  var div = L.DomUtil.create('div', 'info legend');
  div.innerHTML +=
    '<img class= "landlegend" src="images/geoserver-GetLegendGraphic.png" alt="legend">';
  return div;
};

//Removing legend from the layer and adding the right one after the click event

map.on('baselayerchange', function(eventLayer) {

  function remover(legend) {
    if(legend._map) {
      map.removeControl(legend);
    }
  }

  remover(povlegend);
  remover(denlegend);
  remover(landlegend);

  if (eventLayer.name === 'Household Poverty Rates') {
    povlegend.addTo(map);

  } else if (eventLayer.name === 'Population Density') {
    denlegend.addTo(map);
  }
  else if (eventLayer.name === 'LandCover Classification') {
    landlegend.addTo(map);
  }
})

//leaflet legend containers
var legendFrom = $('.leaflet-top.leaflet-right');
var legendTo = $('#container1');
setParent(legendFrom[0], legendTo[0]);


let nav_height = $(
  ".navbar.fixed-top.row.navigation_dashboard"
).height()
let window_height = $(window).height()
$("#panel").css("top", `${((nav_height / window_height) * 100) - 1}%`)
$("#panel").css("height", `${(101 - (nav_height / window_height) * 100)}%`)


function layer() {
  var layer = this;
  var name = layer.getGeoJSON().name;
  var item = filters.appendChild(document.createElement('div'));
  var checkbox = item.appendChild(document.createElement('input'));
  var label = item.appendChild(document.createElement('label'));
  checkbox.type = 'checkbox';
  checkbox.id = name;
  label.innerHTML = name;
  label.setAttribute('for', name);
  checkbox.addEventListener('change', update);

  function update() {
    (checkbox.checked) ? layer.addTo(map): map.removeLayer(layer);
  }
}
