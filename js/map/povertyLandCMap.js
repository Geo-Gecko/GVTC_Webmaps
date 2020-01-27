

//adding the geojsons
var density;
var baseMaps = {}
var geoJson_;
let popngeoJson_ = {};
let povgeoJson = {};
let congeoJson = {};
let long_id = "1-0V2d8gYHoCb7OZidsSBuVHfs30zaBW-sM6meBF02mw";

//calling density data from google sheets
let density_sheet = "251717838"
let url1 = `https://docs.google.com/spreadsheets/d/${long_id}/export?format=csv&id=${long_id}&gid=${density_sheet}`

//calling poverty data from google sheets
let poverty_sheet = "2065427744"
let url2 = `https://docs.google.com/spreadsheets/d/${long_id}/export?format=csv&id=${long_id}&gid=${poverty_sheet}`

//calling hippos from google sheets
let hip_sheet = "1478917428"
let url3 = `https://docs.google.com/spreadsheets/d/${long_id}/export?format=csv&id=${long_id}&gid=${hip_sheet}`

let axioses = [axios.get(url1, { mode: 'no-cors' }), axios.get(url2, { mode: 'no-cors' }), axios.get(url3, { mode: 'no-cors' })]

axios.all(axioses)
    .then(responseArrs => {
        density_data = $.csv.toObjects(responseArrs[0].data),
            density_data.forEach(point => {
                popngeoJson_[point["NAME"]] = parseInt(point["pop_density"])
            })

        //calling geosjon and style for density
        var den = L.geoJson(density, {
            style: styledensity
        })
        //creating layer for density
        baseMaps["Population Density"] = den


        // second URL
        poverty_data = $.csv.toObjects(responseArrs[1].data),
            poverty_data.forEach(point => {
                povgeoJson[point["SNAME2014"]] = parseFloat(point["Poverty_5"])
            })

        //calling geosjon and style for poverty
        var pov = L.geoJson(poverty, {
            style: stylepoverty
        });

        //creating layer for poverty, landcover and conflicts
        baseMaps["Household Poverty Rates"] = pov
        baseMaps["LandCover Classification"] = landcover

        // third URL
        hippos4 = $.csv.toObjects(responseArrs[2].data)
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

        L.control.layers(baseMaps, "", {
            collapsed: false,
        }).addTo(map);
        console.log(baseMaps)
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

    let current_map = window.location.href
    current_map = current_map.split("/")
    current_map = current_map[current_map.length - 1]
    current_map = current_map.split(".")[0]
    console.log(current_map)
    if (current_map != "map2" && current_map != "map3") {
        L.control.layers("", overlayMaps, {
            collapsed: false,
        }).addTo(map);
    }

}
