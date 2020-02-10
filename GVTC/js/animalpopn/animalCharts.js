
function plotHippoBwindi(xValues, yValues) {
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


function plotGorillaBwindi(xValues, yValues) {
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


function plotElephantBwindi(xValues, yValues) {
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


function plotGorillaVirunga(xValues, yValues) {
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


function plotHippoVirunga(xValues, yValues) {
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
