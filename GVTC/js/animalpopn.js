
//hippo data for bwindi
let hip_sheet = "1116318864"
let long_id = "1-0V2d8gYHoCb7OZidsSBuVHfs30zaBW-sM6meBF02mw"
let url = `https://docs.google.com/spreadsheets/d/${long_id}/export?format=csv&id=${long_id}&gid=${hip_sheet}`

axios.get(url, {
    mode: 'no-cors'
  })
  .then(r => {
    hippos4 = $.csv.toObjects(r.data)
    let x_values = []
    let y_values = []

    hippos4.forEach(hippo => {
      y_values.push(hippo["hippos"])
      x_values.push(hippo["Year"])

    })

    plotOne(x_values, y_values);
  })
  .catch(e => console.log(e))



function plotOne(xValues, yValues) {
  var ctxx = document.getElementsByClassName("bar-chart4");
  myEnrolChart = new Chart(ctxx, {
    type: 'bar',
    data: {
      labels: ["1960", "1982-1983", "1995-1996", "1999-2003", "2004-2006", "2007-2010", "2011-2014", "2015-2017"],
      datasets: [

        {
          label: "Hippos",
          backgroundColor: "pink",
          borderColor: "red",
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

//gorilla data for bwindi
let gorilla_sheet = "1422622650"
url = `https://docs.google.com/spreadsheets/d/${long_id}/export?format=csv&id=${long_id}&gid=${gorilla_sheet}`
axios.get(url, {
    mode: 'no-cors'
  })
  .then(r => {
    gorillas = $.csv.toObjects(r.data)
    let x_values = []
    let y_values = []

    gorillas.forEach(gorilla => {
      y_values.push(gorilla["gorillas"])
      x_values.push(gorilla["Year"])

    })

    plotTwo(x_values, y_values);
  })
  .catch(e => console.log(e))


function plotTwo(xValues, yValues) {
  var ctxx2 = document.getElementsByClassName("bar-chart5");
  myEnrolChart = new Chart(ctxx2, {
    type: 'bar',
    data: {
      labels: ["1960", "1982-1983", "1995-1996", "1999-2003", "2004-2006", "2007-2010", "2011-2014", "2015-2017"],
      datasets: [

        {
          label: "Gorillas",
          backgroundColor: "pink",
          borderColor: "red",
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

// elephant data for bwindi
let elephant_sheet = "1933452056"
url = `https://docs.google.com/spreadsheets/d/${long_id}/export?format=csv&id=${long_id}&gid=${elephant_sheet}`
axios.get(url, {
    mode: 'no-cors'
  })
  .then(r => {
    elephants = $.csv.toObjects(r.data)
    let x_values = []
    let y_values = []

    elephants.forEach(elephant => {
      y_values.push(elephant["elephants"])
      x_values.push(elephant["Year"])

    })

    plotThree(x_values, y_values);
  })
  .catch(e => console.log(e))


function plotThree(xValues, yValues) {
  var ctxx3 = document.getElementsByClassName("bar-chart6");
  myEnrolChart = new Chart(ctxx3, {
    type: 'bar',
    data: {
      labels: ["1960", "1982-1983", "1995-1996", "1999-2003", "2004-2006", "2007-2010", "2011-2014", "2015-2017"],
      datasets: [

        {
          label: "Elephants",
          backgroundColor: "pink",
          borderColor: "red",
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

// gorilla data for virunga
let gorilla2_sheet = "858359305"
url = `https://docs.google.com/spreadsheets/d/${long_id}/export?format=csv&id=${long_id}&gid=${gorilla2_sheet}`
axios.get(url, {
    mode: 'no-cors'
  })
  .then(r => {
    gorilla2 = $.csv.toObjects(r.data)
    let x_values = []
    let y_values = []

    gorilla2.forEach(gorilla2 => {
      y_values.push(gorilla2["gorillas"])
      x_values.push(gorilla2["Year"])

    })

    plotFour(x_values, y_values);
  })
  .catch(e => console.log(e))


function plotFour(xValues, yValues) {
  var ctxx3 = document.getElementsByClassName("line-chart2");
  myEnrolChart = new Chart(ctxx3, {
    type: 'bar',
    data: {
      labels: ["1960", "1982-1983", "1995-1996", "1999-2003", "2004-2006", "2007-2010", "2011-2014", "2015-2017"],
      datasets: [

        {
          label: "Gorillas",
          backgroundColor: 'rgba(255, 165, 0, 0.6)',
          borderColor: 'rgba(255, 165, 0, 1)',
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

// hippos data for virunga
let hippos2_sheet = "944111397"
url = `https://docs.google.com/spreadsheets/d/${long_id}/export?format=csv&id=${long_id}&gid=${hippos2_sheet}`
axios.get(url, {
    mode: 'no-cors'
  })
  .then(r => {
    hippos2 = $.csv.toObjects(r.data)
    let x_values = []
    let y_values = []

    hippos2.forEach(hippos2 => {
      y_values.push(hippos2["hippos"])
      x_values.push(hippos2["Year"])

    })

    plotFive(x_values, y_values);
  })
  .catch(e => console.log(e))


function plotFive(xValues, yValues) {
  var ctxx3 = document.getElementsByClassName("line-chart1");
  myEnrolChart = new Chart(ctxx3, {
    type: 'bar',
    data: {
      labels: ["1994", "2003", "2005", "2009", "2013", "2015", "2017"],
      datasets: [

        {
          label: "Hippos",
          backgroundColor: 'rgba(255, 165, 0, 0.6)',
          borderColor: 'rgba(255, 165, 0, 1)',
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
