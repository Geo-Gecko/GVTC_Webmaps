

let long_id_ = "1-0V2d8gYHoCb7OZidsSBuVHfs30zaBW-sM6meBF02mw"
axios.get(
    `https://docs.google.com/spreadsheets/d/${long_id_}/export?format=csv&id=${long_id_}&gid=828811152`, { mode: 'no-cors' }
)
    .then(response => {
        let google_sheets_finances = $.csv.toObjects(response.data)
        console.log(google_sheets_finances)
        var myStyle = {
            weight: 1,
            opacity: 1,
            color: '#808080',
            fillOpacity: 1,
            fillColor: '#1F532C'
        };

        var finances_data = L.geoJSON(Finances, {
            style: myStyle
        }).addTo(map);
        finances_data.eachLayer(function (layer) {
            layer.bindPopup('<strong>Parish</strong><br> ' + layer.feature.properties.pname);
            layer.on('mouseover', function (e) {
                this.openPopup();
            });
            layer.on('mouseout', function (e) {
                this.closePopup();
            });
        });

        // Creating a slider
        var slidervar = document.getElementById('slider')
        noUiSlider.create(slider, {
            start: [0, 104000],
            connect: true,
            step: 5,
            range: {
                'min': 0,
                'max': 104000
            }
        });

        var slidervar2 = document.getElementById('slider2')
        noUiSlider.create(slider2, {
            start: [0, 47],
            connect: true,
            range: {
                'min': 0,
                'max': 47
            }
        });

        var slidervar3 = document.getElementById('slider3')
        noUiSlider.create(slider3, {
            start: [0, 615000],
            connect: true,
            step: 5,
            range: {
                'min': 0,
                'max': 615000
            }
        });

        var slidervar4 = document.getElementById('slider4')
        noUiSlider.create(slider4, {
            start: [0, 15000],
            connect: true,
            step: 5,
            range: {
                'min': 0,
                'max': 15000
            },
        });

        document.getElementById('input-number-min').setAttribute("value", "0")
        document.getElementById('input-number-max').setAttribute("value", "104000")
        document.getElementById('input-number-min2').setAttribute("value", "0")
        document.getElementById('input-number-max2').setAttribute("value", "47")
        document.getElementById('input-number-min3').setAttribute("value", "0")
        document.getElementById('input-number-max3').setAttribute("value", "615000")
        document.getElementById('input-number-min4').setAttribute("value", "0")
        document.getElementById('input-number-max4').setAttribute("value", "15000")

        var inputNumberMin = document.getElementById("input-number-min");
        var inputNumberMax = document.getElementById("input-number-max");
        inputNumberMin.addEventListener("change", function () {
            slidervar.noUiSlider.set([this.value, null]);
        });
        inputNumberMax.addEventListener("change", function () {
            slidervar.noUiSlider.set(null, this.value);
        });

        var sliderData = [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ]

        //Connecting the slider to the data
        slidervar.noUiSlider.on('update', function (values, handle) {
            if (handle == 0) {
                document.getElementById('input-number-min').value = values[0];
            } else {
                document.getElementById('input-number-max').value = values[1];
            }

            sliderData[0] = values;

            updateFeatures(sliderData);
        })
        //Connecting the slider to the data
        slidervar2.noUiSlider.on('update', function (values, handle) {
            if (handle == 0) {
                document.getElementById('input-number-min2').value = values[0];
            } else {
                document.getElementById('input-number-max2').value = values[1];
            }

            sliderData[1] = values;

            updateFeatures(sliderData);
        })
        //Connecting the slider to the data
        slidervar3.noUiSlider.on('update', function (values, handle) {
            if (handle == 0) {
                document.getElementById('input-number-min3').value = values[0];
            } else {
                document.getElementById('input-number-max3').value = values[1];
            }

            sliderData[2] = values;

            updateFeatures(sliderData);
        })

        slidervar4.noUiSlider.on('update', function (values, handle) {
            if (handle == 0) {
                document.getElementById('input-number-min4').value = values[0];
            } else {
                document.getElementById('input-number-max4').value = values[1];
            }

            sliderData[3] = values;

            updateFeatures(sliderData);
        })

        function updateFeatures(sliderData) {

            // 828811152 gid connect to this sheet for popn, pop-density, amount and usd
            for (key in finances_data['_layers']) {
                var l = finances_data['_layers'][key];
                let google_sheet_equivalent;
                google_sheets_finances.forEach(row => {
                    if (row["pname"] === l.feature.properties.pname) {
                        google_sheet_equivalent = row
                    }
                })

                // some names in the geojson are missing from the google sheet
                if (google_sheet_equivalent) {
                    if (google_sheet_equivalent.Amount >= parseInt(sliderData[0][0]) && google_sheet_equivalent.Amount <= parseInt(sliderData[0][1]) && parseFloat(google_sheet_equivalent.USD_capita) >= parseFloat(sliderData[1][0]) && parseFloat(google_sheet_equivalent
                        .USD_capita) <= parseFloat(sliderData[1][1]) &&
                        google_sheet_equivalent.Population >= parseInt(sliderData[2][0]) && google_sheet_equivalent.Population <= parseInt(sliderData[2][1]) && google_sheet_equivalent.Pop_densit >= parseInt(sliderData[3][0]) && google_sheet_equivalent.Pop_densit <= parseInt(
                            sliderData[3][1])) {
                        l.setStyle({
                            opacity: 1,
                            fillOpacity: 1
                        })
                    } else {
                        l.setStyle({
                            opacity: 0,
                            fillOpacity: 0
                        })
                    }
                }
            }

        }

        $('.leaflet-top.leaflet-right').removeClass('leaflet-top').removeClass('leaflet-right');
        $('.leaflet-bottom.leaflet-left').removeClass('leaflet-bottom').removeClass('leaflet-left');
    })
