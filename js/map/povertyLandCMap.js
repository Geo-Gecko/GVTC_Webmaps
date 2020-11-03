

//adding the geojsons
var density, baseMaps = {}, geoJson_, popngeoJson_ = {},
    povgeoJson = {}, congeoJson = {}, popDensityFn, years = [],
    long_id = "1-0V2d8gYHoCb7OZidsSBuVHfs30zaBW-sM6meBF02mw";
var pop_density_2017;
// check map being called
let current_map = window.location.href
current_map = current_map.split("/")
current_map = current_map[current_map.length - 1]
current_map = current_map.split(".")[0]


//calling density data from google sheets
let density_sheet = "Hippos_Bwindi_Infographics"
let url1 = `https://sheets.googleapis.com/v4/spreadsheets/${long_id}/values/${density_sheet}?key=AIzaSyC_iis9BnBJl7qxK_fRV6Hd5GpNFzFkxNY`

//calling poverty data from google sheets
let poverty_sheet = "Polygons_poverty_2017"

let url2 = `https://sheets.googleapis.com/v4/spreadsheets/${long_id}/values/${poverty_sheet}?key=AIzaSyC_iis9BnBJl7qxK_fRV6Hd5GpNFzFkxNY`

//calling hippos from google sheets
let hip_sheet = "Points_Hippos_2017"
let url3 = `https://sheets.googleapis.com/v4/spreadsheets/${long_id}/values/${hip_sheet}?key=AIzaSyC_iis9BnBJl7qxK_fRV6Hd5GpNFzFkxNY`

let axioses = [axios.get(url1), axios.get(url2), axios.get(url3)]

axios.all(axioses)
    .then(responseArrs => {
        density_data = create_response_array_object(responseArrs[0].data);
        let year_data = Object.keys(density_data[0]).slice(start = 1);
        year_data.forEach(year => {
            year = year.split("_")
            year = year[year.length - 1]
            years.push(year);
        })
        density_data.forEach(point => {
            popngeoJson_[point["NAME"]] = parseInt(point[`pop_density_${years[0]}`])
        });

        //calling geosjon and style for density
        var den_caller = () => {
            let den = L.geoJson(density, {
                style: styledensity
            })
            den.eachLayer(function (layer) {
                layer.bindPopup('<strong>Parish</strong><br> ' + layer.feature.properties.pname);
                layer.on('mouseover', function (e) {
                    this.openPopup();
                });
                layer.on('mouseout', function (e) {
                    this.closePopup();
                });
            });
            return den
        }
        var den = den_caller()

        //creating layer for density
        baseMaps["Population Density"] = den


        // second URL
        poverty_data = create_response_array_object(responseArrs[1].data),
            poverty_data.forEach(point => {
                povgeoJson[point["SNAME2014"]] = parseFloat(point["Poverty_5"])
            })

        //calling geosjon and style for poverty
        var pov = L.geoJson(poverty, {
            style: stylepoverty
        })
        pov.eachLayer(function (layer) {
            layer.bindPopup('<strong>Subcounty</strong><br> ' + layer.feature.properties.SNAME2014);
            layer.on('mouseover', function (e) {
                this.openPopup();
            });
            layer.on('mouseout', function (e) {
                this.closePopup();
            });
        });

        //creating layer for poverty, landcover and conflicts
        baseMaps["Household Poverty Rates"] = pov
        baseMaps["LandCover Classification"] = landcover

        // third URL
        hippos4 = create_response_array_object(responseArrs[2].data)
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

        let layerControls = L.control.layers(baseMaps, "", {
            collapsed: false,
            sortLayers: true
        }).addTo(map);

        // add drop down to Population Density
        var yearSelector = document.createElement("select");
        yearSelector.setAttribute(
            "style", "border-radius: 20px; border-width: 1px; margin-left: 2%"
        )
        let popn_dropdown = year_selected => {
            let popn_density = $("span:contains('Population Density')")[0]
            var year_ = document.createElement("option")
            while (yearSelector.firstChild) {
                yearSelector.removeChild(yearSelector.firstChild);
            }
            year_.textContent = "Year"
            if (!year_selected) {
                year_.setAttribute("selected", "selected")
            }
            year_.setAttribute("disabled", true)
            yearSelector.appendChild(year_)
            years.forEach(year => {
                var options = document.createElement("option")
                options.textContent = year
                if (year_selected && year_selected === year) {
                    options.setAttribute("selected", "selected")
                }
                yearSelector.appendChild(options)
            })
            popn_density.appendChild(yearSelector)
        }
        popn_dropdown(0)
        
        let hPovertyRates = $("span:contains(' Household Poverty Rates')")[0]
        hPovertyRates.appendChild(parentDiv)
                
        let LClassification = $("span:contains(' LandCover Classification')")[0]
        LClassification.appendChild(parentDiv2)

        // update map on selecting different years
        function updatePopnDensity() {
            // remove previous control and its layer if its on map
            layerControls.removeLayer(baseMaps["Population Density"])
            map.removeLayer(baseMaps["Population Density"])

            //calling geosjon and style for density
            popngeoJson_ = {}
            density_data.forEach(point => {
                popngeoJson_[point["NAME"]] = parseInt(
                    point[`pop_density_${yearSelector.value}`]
                )
            });
            var den = den_caller()
            baseMaps["Population Density"] = den
            layerControls.addBaseLayer(
                baseMaps["Population Density"], "Population Density"
            )
            // add drop down back
            popn_dropdown(yearSelector.value)
            $(yearSelector.parentElement.previousSibling).click()
        };
        yearSelector.addEventListener('change', updatePopnDensity, false);

        if (current_map != "map1" && current_map != "map3") {
            t1t2_datepickers(
                "selector", mapA, current_map_A_forest_tileObj
                , map_A_forest_tile, "time_heading1"
            )
            t1t2_datepickers(
                "selector2", mapB, current_map_B_forest_tileObj
                , map_B_forest_tile, "time_heading2"
            )
            let fLoss = document.createElement("strong")
            fLoss.textContent = "Forest loss"
            $("#selector_menu").prepend(fLoss)
            $(fLoss).after("<br>")
        }

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


    if (current_map != "map2" && current_map != "map3") {
        L.control.layers("", overlayMaps, {
            collapsed: false,
        }).addTo(map);
    }

}
