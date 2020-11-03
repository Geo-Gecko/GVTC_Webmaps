

// add files from animalpopn folder to index.html
let hmap = document.createElement("script");
hmap.setAttribute("type", "text/javascript");
hmap.setAttribute("src", `js/patrol-traffic-cropraid/ptcSliders.js`);
document.body.appendChild(hmap)

hmap = document.createElement("script");
hmap.setAttribute("type", "text/javascript");
hmap.setAttribute("src", `js/patrol-traffic-cropraid/ptcCharts.js`);
document.body.appendChild(hmap)

//trafficking data 2016
let long_id = "1-0V2d8gYHoCb7OZidsSBuVHfs30zaBW-sM6meBF02mw"
let traffic_2016_raw_sheet = "Trafficking_Infographics"
let url = `https://sheets.googleapis.com/v4/spreadsheets/${long_id}/values/${traffic_2016_raw_sheet}?key=AIzaSyC_iis9BnBJl7qxK_fRV6Hd5GpNFzFkxNY`
axios.get(url, {
  mode: 'no-cors'
})
  .then(r => {
    let traffic_data = create_response_array_object(r.data)


    let years_ = []
    let no_of_charts = Object.keys(traffic_data[0])
    let past_yr = parseInt(no_of_charts[1].split("(")[1].split(")")[0])
    let recent_yr = parseInt(no_of_charts[Object.keys(traffic_data[0]).length - 1].split("(")[1].split(")")[0])


    while (past_yr <= recent_yr) {
      years_.push(past_yr)
      past_yr += 1
    }

    let raw_grouped_data = {};
    let worked_grouped_data = {};
    years_.forEach((year, i) => {
      raw_grouped_data[year] = []
      worked_grouped_data[year] = []
      traffic_data.forEach(datapoint => {
        raw_grouped_data[year].push(datapoint[`Raw Ivory(${year})`])
        worked_grouped_data[year].push(datapoint[`Worked Ivory(${year})`])
      })

      addBarChart(year, i, raw_grouped_data[year], plotOne, "chart1_");
      addBarChart(year, i, worked_grouped_data[year], plotTwo, "chart2_")
    })
  })
  .catch(e => console.log(e))



//patrols for virunga, mgahinga, bwindi and volcanoes
let patrol_v_sheet = "Patrol_coverage"
url = `https://sheets.googleapis.com/v4/spreadsheets/${long_id}/values/${patrol_v_sheet}?key=AIzaSyC_iis9BnBJl7qxK_fRV6Hd5GpNFzFkxNY`

axios.get(url, {
  mode: 'no-cors'
})
  .then(r => {
    patrols_data = create_response_array_object(r.data)

    let no_of_years = Object.keys(patrols_data[0])
    no_of_years = no_of_years.filter(patrol => {
      if (patrol.split(" ").length > 1 && parseInt(patrol.split(" ")[0])) {
        return true
      } else {
        return false
      }
    })

    let years_ = []
    let past_yr = parseInt(no_of_years[0].split(" ")[0])
    let recent_yr = parseInt(no_of_years[no_of_years.length - 1].split(" ")[0])
    while (past_yr <= recent_yr) {
      years_.push(past_yr)
      past_yr += 1
    }

    let virunga_data = {}, mgnp_data = {}, bwindi_data = {},
      volcano_data = {}, parks_data = {}, parks = ["Virunga", "Mgahinga", "Bwindi", "Volcanoes"];
    years_.forEach((year, i) => {
      virunga_data[year] = []
      mgnp_data[year] = []
      bwindi_data[year] = []
      volcano_data[year] = []
      patrols_data.forEach(datapoint => {
        virunga_data[year].push(datapoint[`${year} Percentage_Virunga`])
        mgnp_data[year].push(datapoint[`${year} Percentage_Mgnp`])
        bwindi_data[year].push(datapoint[`${year} Percentage_Bwindi`])
        volcano_data[year].push(datapoint[`${year} Percentage_Volcanoes`])
      });
      [virunga_data[year] ,mgnp_data[year], bwindi_data[year], volcano_data[year]].forEach((point, i) => {
        parks_data[parks[i]] = point
      })
      addBarChart(year, i, parks_data, plotFour, "pies")
    })

  })
  .catch(e => console.log(e))

//crop raids mgahinga
let raids_mgahinga_sheet = "Crop_raids_MGNP"
url = `https://sheets.googleapis.com/v4/spreadsheets/${long_id}/values/${raids_mgahinga_sheet}?key=AIzaSyC_iis9BnBJl7qxK_fRV6Hd5GpNFzFkxNY`

axios.get(url, {
  mode: 'no-cors'
})
  .then(r => {
    raids_mgahinga = create_response_array_object(r.data)
    let x_values = []
    let y_values = []

    raids_mgahinga.forEach(raids_mgahinga => {
      y_values.push(raids_mgahinga["Raids"])
      x_values.push(raids_mgahinga["Month"])
    })

    plotThree(x_values, y_values, "bar-chart3");
  })
  .catch(e => console.log(e))


//crop raids bwindi
let raids_bwindi_sheet = "Crop_raids_Bwindi"
url = `https://sheets.googleapis.com/v4/spreadsheets/${long_id}/values/${raids_bwindi_sheet}?key=AIzaSyC_iis9BnBJl7qxK_fRV6Hd5GpNFzFkxNY`

axios.get(url, {
  mode: 'no-cors'
})
  .then(r => {
    raids_bwindi = create_response_array_object(r.data)
    let x_values = []
    let y_values = []

    raids_bwindi.forEach(raids_bwindi => {
      y_values.push(raids_bwindi["Raids"])
      x_values.push(raids_bwindi["Month"])
    })

    plotThree(x_values, y_values, "bar-chart4");
  })
  .catch(e => console.log(e))

let nav_height = $(
  ".navbar.fixed-top.row.navigation_dashboard"
).height()
let window_height = $(window).height()
$("#panel_d").css("top", `${((nav_height / window_height) * 100) - 1}%`)
$("#panel_d").css("height", `${(101 - (nav_height / window_height) * 100)}%`)
