

function addBarChart(year, i, y_values, plotFunc, chartElement) {
    let slides2 = document.getElementById(chartElement);
    let canvas_ = document.createElement("div")
    if (i === 0) {
        canvas_.setAttribute("class", "slide active-slide")
    } else {
        canvas_.setAttribute("class", "slide")
    }
    canvas_.setAttribute("style", "position: relative;")
    let canvas2 = document.createElement('CANVAS')
    canvas2.setAttribute("class", `${chartElement}bar-chart${year}`)
    canvas_.appendChild(canvas2)
    slides2.appendChild(canvas_)

    plotFunc(year, y_values, `${chartElement}bar-chart${year}`);

}

function plotOne(year, yValues, chartId) {
    var ctxx = document.getElementsByClassName(chartId);
    myEnrolChart = new Chart(ctxx, {
        type: 'bar',
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [
                {
                    label: `Raw Ivory Trafficking ${year}`,
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
                position: "bottom"
            },
            title: {
                display: true
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
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

function plotTwo(year, yValues, chartId) {
    var ctxx = document.getElementsByClassName(chartId);
    myEnrolChart = new Chart(ctxx, {
        type: 'bar',
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [
                {
                    label: `Worked Ivory Trafficking ${year}`,
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
                position: "bottom"
            },
            title: {
                display: true
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
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

function plotThree(xValues, yValues, barClassName) {
    var ctxx = document.getElementsByClassName(barClassName);
    myEnrolChart = new Chart(ctxx, {
        type: 'bar',
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
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
                position: "bottom"
            },
            title: {
                display: true
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
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


function plotFour(year, yValues, chartClassName) {
    var ctxx = document.getElementsByClassName(chartClassName)[0];
    myEnrolChart = new Chart(ctxx, {
        type: 'bar',
        data: {
            labels: ["Virunga", "Mgahinga", "Bwindi", "Volcanoes"],
            datasets: [{
                label: `Patrolled ${year}`,
                backgroundColor: '#228B22',
                data: [
                    yValues["Virunga"][0], yValues["Mgahinga"][0],
                    yValues["Bwindi"][0], yValues["Volcanoes"][0]
                ],
            }, {
                label: `Not Patrolled ${year}`,
                backgroundColor: '#e5e5e5',
                data: [
                    yValues["Virunga"][1], yValues["Mgahinga"][1],
                    yValues["Bwindi"][1], yValues["Volcanoes"][1]
                ],
            }]
        },
        options: {
            responsive: true,
            legend: {
                position: "right"
            },
            title: {
                display: true
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
                        max: 100,
                        beginAtZero: true,
                    },
                    type: 'linear',
                }]
            }
        }
    });
}
