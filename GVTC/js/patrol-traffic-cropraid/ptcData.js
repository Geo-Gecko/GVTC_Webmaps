

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
let traffic_2016_raw_sheet = "1892401990"
let url = `https://docs.google.com/spreadsheets/d/${long_id}/export?format=csv&id=${long_id}&gid=${traffic_2016_raw_sheet}`
axios.get(url, {
  mode: 'no-cors'
})
  .then(r => {
    let traffic_data = $.csv.toObjects(r.data)


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
let patrol_v_sheet = "1455012350"
url = `https://docs.google.com/spreadsheets/d/${long_id}/export?format=csv&id=${long_id}&gid=${patrol_v_sheet}`

axios.get(url, {
  mode: 'no-cors'
})
  .then(r => {
    patrols_data = $.csv.toObjects(r.data)

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

    let virunga_data = {}, mgnp_data = {}, bwindi_data = {}, volcano_data = {}
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
      addPieCharts(year, i, [virunga_data[year], mgnp_data[year]], "pies1", ["Virunga", "Mgahinga"])
      addPieCharts(year, i, [bwindi_data[year], volcano_data[year]], "pies2", ["Bwindi", "Volcanoes"])
    })

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

//code fo the chart is 
  
var ctx = document.getElementById("myChart4").getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["<  1","1 - 2","3 - 4","5 - 9","10 - 14","15 - 19","20 - 24","25 - 29","> - 29"],
        datasets: [{
            label: 'Employee',
            backgroundColor: "#caf270",
            data: [12, 59, 5, 56, 58,12, 59, 87, 45],
        }, {
            label: 'Engineer',
            backgroundColor: "#45c490",
            data: [12, 59, 5, 56, 58,12, 59, 85, 23],
        }, {
            label: 'Government',
            backgroundColor: "#008d93",
            data: [12, 59, 5, 56, 58,12, 59, 65, 51],
        }, {
            label: 'Political parties',
            backgroundColor: "#2e5468",
            data: [12, 59, 5, 56, 58, 12, 59, 12, 74],
        }],
    },
options: {
    tooltips: {
      displayColors: true,
      callbacks:{
        mode: 'x',
      },
    },
    scales: {
      xAxes: [{
        stacked: true,
        gridLines: {
          display: false,
        }
      }],
      yAxes: [{
        stacked: true,
        ticks: {
          beginAtZero: true,
        },
        type: 'linear',
      }]
    },
        responsive: true,
        maintainAspectRatio: false,
        legend: { position: 'bottom' },
    }
});