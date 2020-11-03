axios.get(url, {
    mode: 'no-cors'
  })
  .then(r => {
    forest_loss = create_response_array_object(r.data)
    let x_values = []
    let y_values = []

    forest_loss.forEach(forest_loss => {
      y_values.push(forest_loss["Parks_Forest loss (SqKm)"])
      x_values.push(forest_loss["Years"])
    })

    plotOne(x_values, y_values);
  })
  .catch(e => console.log(e))

function plotOne(xValues, yValues) {
  var ctxx = document.getElementsByClassName("bar-chart1");
  myEnrolChart = new Chart(ctxx, {
    type: 'bar',
    data: {
      labels: ["2015", "2016", "2017"],
      datasets: [{
        label: "Forest Loss In Park (Sq Km)",
        backgroundColor: 'rgba(40, 167, 69, 0.37)',
        borderColor: '#228b22',
        borderWidth: 1,
        data: yValues
      }]
    },
    options: {
      responsive: true,
      legend: {
        position: "bottom",
      },
      title: {
        display: true
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            stepSize: 10,
            min: 11620,
            userCallback: function(value, index, values) {
              value = value.toString();
              value = value.split(/(?=(?:...)*$)/);
              value = value.join(',');
              return value;
            }
          }
        }]
      }
    }
  });
}

//forest loss for 5km buffer
let forest_loss_sheet2 = "Forest_loss"
// NOTE FOR ANYONE: should this be the same as in arrests-deforestn.js
url = `https://sheets.googleapis.com/v4/spreadsheets/${long_id}/values/${forest_loss_sheet2}?key=AIzaSyC_iis9BnBJl7qxK_fRV6Hd5GpNFzFkxNY`

axios.get(url, {
    mode: 'no-cors'
  })
  .then(r => {
    forest_loss = create_response_array_object(r.data)
    let x_values = []
    let y_values = []

    forest_loss.forEach(forest_loss => {
      y_values.push(forest_loss["Buffer_Forest loss (SqKm)"])
      x_values.push(forest_loss["Years"])
    })

    plotTwo(x_values, y_values);
  })
  .catch(e => console.log(e))

function plotTwo(xValues, yValues) {
  var ctxx = document.getElementsByClassName("bar-chart2");
  myEnrolChart = new Chart(ctxx, {
    type: 'bar',
    data: {
      labels: ["2015", "2016", "2017"],
      datasets: [{
        label: "Forest Loss In 5Km Buffer(Sq Km)",
        backgroundColor: 'rgba(40, 167, 69, 0.37)',
        borderColor: '#228b22',
        borderWidth: 1,
        data: yValues
      }]
    },
    options: {
      responsive: true,
      legend: {
        position: "bottom"
      },
      title: {
        display: true
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            stepSize: 50,
            min: 7500,
            userCallback: function(value, index, values) {
              value = value.toString();
              value = value.split(/(?=(?:...)*$)/);
              value = value.join(',');
              return value;
            }
          }
        }]
      }
    }
  });
}

//forest loss for beni
let forest_loss_sheet3 = "Forest_loss"
url = `https://sheets.googleapis.com/v4/spreadsheets/${long_id}/values/${forest_loss_sheet3}?key=AIzaSyC_iis9BnBJl7qxK_fRV6Hd5GpNFzFkxNY`

axios.get(url, {
    mode: 'no-cors'
  })
  .then(r => {
    forest_loss = create_response_array_object(r.data)
    let x_values = []
    let y_values = []

    forest_loss.forEach(forest_loss => {
      y_values.push(forest_loss["Beni_Forest loss (SqKm)"])
      x_values.push(forest_loss["Years"])
    })

    plotThree(x_values, y_values);
  })
  .catch(e => console.log(e))

function plotThree(xValues, yValues) {
  var ctxx = document.getElementsByClassName("bar-chart3");
  myEnrolChart = new Chart(ctxx, {
    type: 'bar',
    data: {
      labels: ["2015", "2016", "2017"],
      datasets: [{
        label: "Forest Loss In Beni(Sq Km)",
        backgroundColor: 'rgba(40, 167, 69, 0.37)',
        borderColor: '#228b22',
        borderWidth: 1,
        data: yValues
      }]
    },
    options: {
      responsive: true,
      legend: {
        position: "bottom"
      },
      title: {
        display: true
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            stepSize: 0.2,
            min: 48
          }
        }]
      }
    }
  });
}
