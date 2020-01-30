

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

function plotTwo(xValues, yValues) {
    var ctxx = document.getElementsByClassName("bar-chart2");
    myEnrolChart = new Chart(ctxx, {
        type: 'bar',
        data: {
            labels: ["Jan-17", "Feb-17", "Mar-17", "Apr-16", "May-16", "Jun-16", "Jul-17", "Jul-17", "Aug-17", "Aug-16", "Sep-17", "Sep-16", "Oct-16", "Oct-17", "Nov-17", "Nov-17", "Dec-17", "Dec-17", "undefined", "undefined"],
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
