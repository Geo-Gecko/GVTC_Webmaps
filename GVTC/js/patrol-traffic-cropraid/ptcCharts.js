

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
    canvas2.setAttribute("width", "100%")
    canvas2.setAttribute("height", "75%")
    canvas_.appendChild(canvas2)
    slides2.appendChild(canvas_)

    plotFunc(year, y_values, `${chartElement}bar-chart${year}`);

}

function plotOne(year, yValues, chartId) {
    var ctxx = document.getElementsByClassName(chartId);
    myEnrolChart = new Chart(ctxx, {
        type: 'bar',
        data: {
            labels: ["Jan-16", "Mar-16", "Apr-16", "May-16", "Jun-16", "Aug-16", "Sep-16", "Oct-16", "Nov-16", "Dec-16", "Dec-16"],
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

function plotTwo(year, yValues, chartId) {
    var ctxx = document.getElementsByClassName(chartId);
    myEnrolChart = new Chart(ctxx, {
        type: 'bar',
        data: {
            labels: ["Jan-17", "Feb-17", "Mar-17", "Apr-16", "May-16", "Jun-16", "Jul-17", "Jul-17", "Aug-17", "Aug-16", "Sep-17", "Sep-16", "Oct-16", "Oct-17", "Nov-17", "Nov-17", "Dec-17", "Dec-17"],
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

function plotThree(xValues, yValues, barClassName) {
    var ctxx = document.getElementsByClassName(barClassName);
    myEnrolChart = new Chart(ctxx, {
        type: 'bar',
        data: {
            labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
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


function plotFour(xValues, yValues, chartClassName) {
    var ctxx = document.getElementsByClassName(chartClassName);
    myEnrolChart = new Chart(ctxx, {
        type: 'doughnut',
        data: {
            labels: ["Patrolled", "Not Patrolled"],
            datasets: [
                {
                    label: "Percentage Patrolled",
                    backgroundColor: ['#228B22', '#e5e5e5',],
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
