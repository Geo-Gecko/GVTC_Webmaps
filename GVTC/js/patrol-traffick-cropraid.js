//trafficking data 2016
let traffic_2016_raw_sheet = "234012165"
let long_id = "1-0V2d8gYHoCb7OZidsSBuVHfs30zaBW-sM6meBF02mw"
let url = `https://docs.google.com/spreadsheets/d/${long_id}/export?format=csv&id=${long_id}&gid=${traffic_2016_raw_sheet}`

axios.get(url, {
    mode: 'no-cors'
  })
  .then(r => {
    traffic_2016_raw = $.csv.toObjects(r.data)
    let x_values = []
    let y_values = []

    traffic_2016_raw.forEach(traffic_2016_raw => {
      y_values.push(traffic_2016_raw["Raw Ivory"])
      x_values.push(traffic_2016_raw["Date"])
    })

    plotOne(x_values, y_values);
  })
  .catch(e => console.log(e))

function plotOne(xValues, yValues) {
  var ctxx = document.getElementsByClassName("bar-chart1");
  myEnrolChart = new Chart(ctxx, {
    type: 'bar',
    data: {
      labels: ["Jan-16", "Mar-16", "Apr-16", "May-16", "Jun-16", "Aug-16", "Sep-16", "Oct-16", "Nov-16", "Dec-16", "Dec-16", "undefined", "undefined"],
      datasets: [
        {
          label: "Raw Ivory Trafficking 2016",
          backgroundColor: 'rgba(255, 239, 213, 1)',
          borderColor: 'rgba(255, 165, 0, 1.8)',
          borderWidth: 1,
          data: yValues
        }
      ]
    },
    options: {
      responsive: true,
      legend: {
        position: "top"
      },
      title: {
        display: true
      },
      scales: {
        yAxes: [{
          ticks: {

            beginAtZero: true
          }
        }]
      }
    }
  });
}

//trafficking data 2017
let traffic_2016_worked_sheet = "234012165"
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

function plotTwo(xValues, yValues) {
  var ctxx = document.getElementsByClassName("bar-chart2");
  myEnrolChart = new Chart(ctxx, {
    type: 'bar',
    data: {
      labels: ["Jan-17", "Feb-17","Mar-17", "Apr-16", "May-16", "Jun-16", "Jul-17","Jul-17","Aug-17","Aug-16", "Sep-17","Sep-16", "Oct-16", "Oct-17","Nov-17", "Nov-17", "Dec-17", "Dec-17", "undefined", "undefined"],
      datasets: [
        {
          label: "Worked Ivory Trafficking 2016",
          backgroundColor: 'rgba(40, 167, 69, 0.37)',
          borderColor: '#228b22',
          borderWidth: 1,
          data: yValues
        }
      ]
    },
    options: {
      responsive: true,
      legend: {
        position: "top"
      },
      title: {
        display: true
      },
      scales: {
        yAxes: [{
          ticks: {

            beginAtZero: true
          }
        }]
      }
    }
  });
}

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

    plotThree(x_values, y_values);
  })
  .catch(e => console.log(e))

function plotThree(xValues, yValues) {
  var ctxx = document.getElementsByClassName("bar-chart3");
  myEnrolChart = new Chart(ctxx, {
    type: 'bar',
    data: {
      labels: ["January", "February","March", "April", "May", "June", "July","August","September","October", "November","December"],
      datasets: [
        {
          label: "Incidences Reported",
          backgroundColor: 'rgba(77, 121, 255, 0.7)',
          borderColor: 'rgba(0, 32, 128, 1.8)',
          borderWidth: 1,
          data: yValues
        }
      ]
    },
    options: {
      responsive: true,
      legend: {
        position: "top"
      },
      title: {
        display: true
      },
      scales: {
        yAxes: [{
          ticks: {

            beginAtZero: true
          }
        }]
      }
    }
  });
}

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

    plotFour(x_values, y_values);
  })
  .catch(e => console.log(e))

function plotFour(xValues, yValues) {
  var ctxx = document.getElementsByClassName("bar-chart4");
  myEnrolChart = new Chart(ctxx, {
    type: 'bar',
    data: {
      labels: ["January", "February","March", "April", "May", "June", "July","August","September","October", "November","December"],
      datasets: [
        {
          label: "Incidences Reported",
          backgroundColor: 'rgba(77, 121, 255, 0.7)',
          borderColor: 'rgba(0, 32, 128, 1.8)',
          borderWidth: 1,
          data: yValues
        }
      ]
    },
    options: {
      responsive: true,
      legend: {
        position: "top"
      },
      title: {
        display: true
      },
      scales: {
        yAxes: [{
          ticks: {

            beginAtZero: true
          }
        }]
      }
    }
  });
}

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

    plotFive(x_values, y_values);
  })
  .catch(e => console.log(e))

function plotFive(xValues, yValues) {
  var ctxx = document.getElementsByClassName("Chart1");
  myEnrolChart = new Chart(ctxx, {
    type: 'doughnut',
    data: {
      labels: [ "Patrolled","Not Patrolled"],
      datasets: [
        {
          label: "Percentage Patrolled",
          backgroundColor: ['#228B22','#e5e5e5',],
          data: yValues
        }
      ]
    },
    options: {
      responsive: true,
      legend: {
        position: "right"
      },
      title: {
        display: true
      },
    }
  });
}

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

    plotSix(x_values, y_values);
  })
  .catch(e => console.log(e))

function plotSix(xValues, yValues) {
  var ctxx = document.getElementsByClassName("Chart2");
  myEnrolChart = new Chart(ctxx, {
    type: 'doughnut',
    data: {
      labels: [ "Patrolled","Not Patrolled"],
      datasets: [
        {
          label: "Percentage Patrolled",
          backgroundColor: ['#228B22','#e5e5e5',],
          data: yValues
        }
      ]
    },
    options: {
      responsive: true,
      legend: {
        position: "right"
      },
      title: {
        display: true
      },
    }
  });
}

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

    plotSeven(x_values, y_values);
  })
  .catch(e => console.log(e))

function plotSeven(xValues, yValues) {
  var ctxx = document.getElementsByClassName("Chart3");
  myEnrolChart = new Chart(ctxx, {
    type: 'doughnut',
    data: {
      labels: [ "Patrolled","Not Patrolled"],
      datasets: [
        {
          label: "Percentage Patrolled",
          backgroundColor: ['#228B22','#e5e5e5',],
          data: yValues
        }
      ]
    },
    options: {
      responsive: true,
      legend: {
        position: "right"
      },
      title: {
        display: true
      },
    }
  });
}

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

    plotEight(x_values, y_values);
  })
  .catch(e => console.log(e))

function plotEight(xValues, yValues) {
  var ctxx = document.getElementsByClassName("Chart4");
  myEnrolChart = new Chart(ctxx, {
    type: 'doughnut',
    data: {
      labels: [ "Patrolled","Not Patrolled"],
      datasets: [
        {
          label: "Percentage Patrolled",
          backgroundColor: ['#228B22','#e5e5e5',],
          data: yValues
        }
      ]
    },
    options: {
      responsive: true,
      legend: {
        position: "right"
      },
      title: {
        display: true
      },
    }
  });
}
