let long_id_ = "1-0V2d8gYHoCb7OZidsSBuVHfs30zaBW-sM6meBF02mw"
axios.get(
  `https://sheets.googleapis.com/v4/spreadsheets/${long_id}/values/Revenue_Sharing?key=AIzaSyC_iis9BnBJl7qxK_fRV6Hd5GpNFzFkxNY`, {
  mode: 'no-cors'
}
)
  .then(response => {
    let google_sheets_finances = create_response_array_object(response.data)

    // TODO change slice to less than 10 after removing the other column names without years
    let selected_year = "2017"
    let year_data = Object.keys(google_sheets_finances[0]).slice(start = 10);
    let first_year = year_data[0].split("_")
    first_year = parseInt(first_year[first_year.length - 1])
    let revenue_years = [first_year]
    let latest_year = year_data[year_data.length - 1].split("_")
    latest_year = parseInt(latest_year[latest_year.length - 1])
    if (parseInt(first_year) != parseInt(latest_year)) {
      while (first_year < latest_year) {
        first_year += 1
        revenue_years.push(first_year)
      }
    }


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


    // Creating a slider
    var slidervar = document.getElementById('slider')
    noUiSlider.create(slider, {
      start: [0, 104000],
      connect: true,
      step: 5,
      range: {
        'min': 0,
        'max': 104000
      },
      tooltips: true
    });

    var slidervar2 = document.getElementById('slider2')
    noUiSlider.create(slider2, {
      start: [0, 47],
      connect: true,
      range: {
        'min': 0,
        'max': 47
      },
      tooltips: true
    });

    var slidervar3 = document.getElementById('slider3')
    noUiSlider.create(slider3, {
      start: [0, 615000],
      connect: true,
      step: 5,
      range: {
        'min': 0,
        'max': 615000
      },
      tooltips: true
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
      tooltips: true
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

    function updatePopup() {
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
    }
    updatePopup()

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
          if (google_sheet_equivalent[`Amount_${selected_year}`] >= parseInt(sliderData[0][0]) && google_sheet_equivalent[`Amount_${selected_year}`] <= parseInt(sliderData[0][1]) && parseFloat(google_sheet_equivalent[`USD_capita_${selected_year}`]) >= parseFloat(sliderData[1][0]) && parseFloat(google_sheet_equivalent
          [`USD_capita_${selected_year}`]) <= parseFloat(sliderData[1][1]) &&
            google_sheet_equivalent[`Population_${selected_year}`] >= parseInt(sliderData[2][0]) && google_sheet_equivalent[`Population_${selected_year}`] <= parseInt(sliderData[2][1]) && google_sheet_equivalent[`Popn_density_${selected_year}`] >= parseInt(sliderData[3][0]) && google_sheet_equivalent[`Popn_density_${selected_year}`] <= parseInt(
              sliderData[3][1])) {
            l.setStyle({
              opacity: 1,
              fillOpacity: 1
            })
            l.bindPopup('<strong>Parish:</strong>' + l.feature.properties.pname + '<br><strong>Amount:</strong> ' + google_sheet_equivalent[`Amount_${selected_year}`] + '<br><strong>Amount per capita:</strong> ' + google_sheet_equivalent[`USD_capita_${selected_year}`] + '<br><strong>Population:</strong> ' + google_sheet_equivalent[`Population_${selected_year}`] + '<br><strong>Population Density:</strong> ' + google_sheet_equivalent[`Popn_density_${selected_year}`]);
            l.on('mouseover', function (e) {
              this.openPopup();
            });
            l.on('mouseout', function (e) {
              this.closePopup();
            });
          } else {
            l.setStyle({
              opacity: 0,
              fillOpacity: 0
            })
          }
        }
      };
    }
    $('.leaflet-top.leaflet-right').removeClass('leaflet-top').removeClass('leaflet-right');
    $('.leaflet-bottom.leaflet-left').removeClass('leaflet-bottom').removeClass('leaflet-left');

    let amounts_text = $("strong:contains('Amounts (USD)')")[0]
    let revenueYearSelector = document.createElement("select");
    revenueYearSelector.setAttribute(
      "style", "border-radius: 20px; border-width: 1px; margin-left: 15%"
    )
    revenue_years.forEach(year => {
      var options = document.createElement("option")
      options.textContent = year
      revenueYearSelector.appendChild(options)
    })
    amounts_text.appendChild(revenueYearSelector)

    // update mapGoogleSheetData on selecting different years
    function mapData() {
      selected_year = revenueYearSelector.value
      updatePopup()
    };
    revenueYearSelector.addEventListener('change', mapData, false);
  })
