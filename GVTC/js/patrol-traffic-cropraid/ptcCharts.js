

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

function addPieCharts(year, i, y_values, chartElement, parks) {
    let slides = document.getElementsByClassName(chartElement)[0];
    parks.forEach((park, j) => {
        let pie1 = document.createElement("div")
        if (i === 0) {
            pie1.setAttribute("class", "col-md-8 slide active-slide")
        } else {
            pie1.setAttribute("class", "col-md-8 slide")
        }
        pie1.setAttribute("style", "position: relative;")

        let title_ = document.createElement("strong")
        title_.textContent = park
        pie1.appendChild(title_)
        let canvas_ = document.createElement('CANVAS')
        canvas_.setAttribute("class", `${park}-${chartElement}-${year}`)
        pie1.appendChild(canvas_)
        slides.appendChild(pie1)

        plotFour(year, y_values[j], `${park}-${chartElement}-${year}`);
    })
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


function plotFour(year, yValues, chartClassName) {
    var ctxx = document.getElementsByClassName(chartClassName)[0];
    myEnrolChart = new Chart(ctxx, {
        type: 'doughnut',
        data: {
            labels: [`Patrolled ${year}`, `Not Patrolled ${year}`],
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


