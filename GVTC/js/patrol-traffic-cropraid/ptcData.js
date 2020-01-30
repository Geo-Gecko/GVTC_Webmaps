//trafficking data 2016
let traffic_2016_raw_sheet = "1892401990"
let long_id = "1-0V2d8gYHoCb7OZidsSBuVHfs30zaBW-sM6meBF02mw"
let url = `https://docs.google.com/spreadsheets/d/${long_id}/export?format=csv&id=${long_id}&gid=${traffic_2016_raw_sheet}`

// add files from animalpopn folder to index.html
let hmap = document.createElement("script");
hmap.setAttribute("type", "text/javascript");
hmap.setAttribute("src", `js/patrol-traffic-cropraid/ptcSliders.js`);
document.body.appendChild(hmap)

hmap = document.createElement("script");
hmap.setAttribute("type", "text/javascript");
hmap.setAttribute("src", `js/patrol-traffic-cropraid/ptcCharts.js`);
document.body.appendChild(hmap)


axios.get(url, {
  mode: 'no-cors'
})
  .then(r => {
    let traffic_raw = $.csv.toObjects(r.data)


    let years_ = []
    let no_of_charts = Object.keys(traffic_raw[0])
    let past_yr = parseInt(no_of_charts[1].split("(")[1].split(")")[0])
    let recent_yr = parseInt(no_of_charts[Object.keys(traffic_raw[0]).length - 1].split("(")[1].split(")")[0])


    while (past_yr <= recent_yr) {
      years_.push(past_yr)
      past_yr += 1
    }

    let grouped_data = {}
    years_.forEach((year, i) => {
      grouped_data[year] = []
      traffic_raw.forEach(datapoint => {
        grouped_data[year].push(datapoint[`Raw Ivory(${year})`])
      })

      addChart(year, i, grouped_data[year])
    })


  })
  .catch(e => console.log(e))



//trafficking data 2017

let traffic_2016_worked_sheet = "1892401990"
url = `https://docs.google.com/spreadsheets/d/${long_id}/export?format=csv&id=${long_id}&gid=${traffic_2016_worked_sheet}`

axios.get(url, {
  mode: 'no-cors'
})
  .then(r => {
    traffic_2016_worked = $.csv.toObjects(r.data)
    let x_values = []
    let y_values = []

    traffic_2016_worked.forEach(traffic_2016_worked => {
      y_values.push(traffic_2016_worked["Worked Ivory"])
      x_values.push(traffic_2016_worked["Date"])
    })

    plotTwo(x_values, y_values);
  })
  .catch(e => console.log(e))


//crop raids mgahinga
let raids_mgahinga_sheet = "1192678611"
url = `https://docs.google.com/spreadsheets/d/${long_id}/export?format=csv&id=${long_id}&gid=${raids_mgahinga_sheet}`

axios.get(url, {
  mode: 'no-cors'
})
  .then(r => {
    raids_mgahinga = $.csv.toObjects(r.data)
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
let raids_bwindi_sheet = "168254427"
url = `https://docs.google.com/spreadsheets/d/${long_id}/export?format=csv&id=${long_id}&gid=${raids_bwindi_sheet}`

axios.get(url, {
  mode: 'no-cors'
})
  .then(r => {
    raids_bwindi = $.csv.toObjects(r.data)
    let x_values = []
    let y_values = []

    raids_bwindi.forEach(raids_bwindi => {
      y_values.push(raids_bwindi["Raids"])
      x_values.push(raids_bwindi["Month"])
    })

    plotThree(x_values, y_values, "bar-chart4");
  })
  .catch(e => console.log(e))

//patrols for virunga
let patrol_v_sheet = "1455012350"
url = `https://docs.google.com/spreadsheets/d/${long_id}/export?format=csv&id=${long_id}&gid=${patrol_v_sheet}`

axios.get(url, {
  mode: 'no-cors'
})
  .then(r => {
    patrols_v = $.csv.toObjects(r.data)
    let x_values = []
    let y_values = []

    patrols_v.forEach(patrols_v => {
      y_values.push(patrols_v["2016 Percentage_Virunga"])
      x_values.push(patrols_v["Patrols_Virunga"])
    })

    plotFour(x_values, y_values, "Chart1");
  })
  .catch(e => console.log(e))

//patrols for mgahinga
let patrol_m_sheet = "1455012350"
url = `https://docs.google.com/spreadsheets/d/${long_id}/export?format=csv&id=${long_id}&gid=${patrol_m_sheet}`

axios.get(url, {
  mode: 'no-cors'
})
  .then(r => {
    patrols_m = $.csv.toObjects(r.data)
    let x_values = []
    let y_values = []

    patrols_m.forEach(patrols_m => {
      y_values.push(patrols_m["2016 Percentage_Mgnp"])
      x_values.push(patrols_m["Patrols_Mgnp"])
    })

    plotFour(x_values, y_values, "Chart2");
  })
  .catch(e => console.log(e))

//patrols for bwindi
let patrol_b_sheet = "1455012350"
url = `https://docs.google.com/spreadsheets/d/${long_id}/export?format=csv&id=${long_id}&gid=${patrol_b_sheet}`

axios.get(url, {
  mode: 'no-cors'
})
  .then(r => {
    patrols_b = $.csv.toObjects(r.data)
    let x_values = []
    let y_values = []

    patrols_b.forEach(patrols_b => {
      y_values.push(patrols_b["2016 Percentage_Bwindi"])
      x_values.push(patrols_b["Patrols_Bwindi"])
    })

    plotFour(x_values, y_values, "Chart3");
  })
  .catch(e => console.log(e))

//patrols for volcanoes
let patrol_vol_sheet = "1455012350"
url = `https://docs.google.com/spreadsheets/d/${long_id}/export?format=csv&id=${long_id}&gid=${patrol_vol_sheet}`

axios.get(url, {
  mode: 'no-cors'
})
  .then(r => {
    patrols_vol = $.csv.toObjects(r.data)
    let x_values = []
    let y_values = []

    patrols_vol.forEach(patrols_vol => {
      y_values.push(patrols_vol["2016 Percentage_Volcanoes"])
      x_values.push(patrols_vol["Patrols_Volcanoes"])
    })

    plotFour(x_values, y_values, "Chart4");
  })
  .catch(e => console.log(e))
