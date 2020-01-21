
//calling hippos from google sheets
let hip_sheet = "1478917428"
let url = `https://docs.google.com/spreadsheets/d/${long_id}/export?format=csv&id=${long_id}&gid=${hip_sheet}`
axios.get(url, {
    mode: 'no-cors'
})
    .then(r => {
        hippos4 = $.csv.toObjects(r.data)
        var jsonFeatures = [];
        hippos4.forEach(hippo => {
            var feature = {
                type: 'Feature',
                properties: hippo,
                geometry: {
                    type: 'Point',
                    coordinates: [hippo['X Value'], hippo['Y Value']]
                }
            }
            jsonFeatures.push(feature)
        })

        geoJson_ = {
            type: 'FeatureCollection',
            name: 'hippos2',
            features: jsonFeatures
        };
        ready(geoJson_)
    })
    .catch(e => console.log(e))

function ready(geoJson_) {
    map.createPane('hippopane');
    map.getPane('hippopane').style.zIndex = 650;
    var geojsonMarkerOptions = {
        pane: 'hippopane',
        radius: 2,
        fillColor: "#07528B",
        color: "#000",
        weight: 0.6,
        opacity: 1,
        fillOpacity: 1
    };

    //adding the animal habitats
    map.createPane('elephantpane');
    map.getPane('elephantpane').style.zIndex = 650;
    var Elephant = L.geoJson(Elephant_habitat, {
        pane: 'elephantpane',
        style: {
            weight: 2,
            opacity: 1,
            color: '#006400',
            fillOpacity: 0,
            fillColor: '#006400'
        }
    });

    function zoomToFeature(e) {
        map.fitBounds(e.target.getBounds());
    }

    map.createPane('gorillapane');
    map.getPane('gorillapane').style.zIndex = 650;
    var Gorilla = L.geoJson(Gorilla_habitat, {
        pane: 'gorillapane',
        style: {
            weight: 2,
            opacity: 1,
            color: '#FF0000',
            fillOpacity: 0,
            fillColor: '#FF0000'
        }
    });

    function zoomToFeature(e) {
        map.fitBounds(e.target.getBounds());
    }

    //adding the hippos layer
    var Hip = L.geoJson(geoJson_, {
        pointToLayer: function (feature, coordinates) {
            return L.circleMarker(coordinates, geojsonMarkerOptions);
        },

    });

    var overlayMaps = {
        "Gorilla Habitat": Gorilla,
        "Hippos": Hip,
        "Elephant Habitat": Elephant
    };

    L.control.layers("", overlayMaps, {
        collapsed: false,
    }).addTo(map);
}
