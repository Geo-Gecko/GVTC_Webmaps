// Trend graph
var ctx = document.getElementsByClassName("line-chart");

//Type, data, options

var chartGraph = new Chart (ctx, {
    type: 'line',
    data: {
        datasets: [{
            borderWidth: 2,
            borderColor: 'rgba(146, 242, 42, 0.85)',
            fill: false,
            backgroundColor: 'rgba(26, 255, 102, 0.4)'
        }, {
            borderWidth: 2,
            borderColor: 'rgba(207, 0, 15, 0.85)',
            fill: false,
            backgroundColor: 'rgba(255, 51, 51, 0.4)'
        },{
            borderWidth: 2,
            borderColor: 'rgba(255, 102, 0, 1)',
            fill: false,
            backgroundColor: 'rgba(255, 163, 102, 0.9)'
        }
    ]},
    plugins: [ChartDataSource],
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    max: 14000,
                    min: 0,
                }
            }]
        },
        plugins: {
            datasource: {
                url: 'keyspecies.xlsx'
            }
        }
    }
});


// Virunga: Hippos graph
var ctx = document.getElementsByClassName("bar-chart1");

//Type, data, options

var chartGraph = new Chart (ctx, {
    type: 'bar',
    data: {
        datasets: [{
            borderWidth: 1,
            borderColor: 'rgba(34,139,34, 1)',
            fill: true,
            backgroundColor: 'rgba(154,205,50, 0.9)',
            opacity: 0.2
        }
    ]},
    plugins: [ChartDataSource],
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    max: 12000,
                    min: 0,
                }
            }]
        },
        plugins: {
            datasource: {
                url: 'virungaHippos.xlsx'
            }
        }
    }
});


//virunga: gorillas graph
var ctx = document.getElementsByClassName("bar-chart2");

//Type, data, options

var chartGraph = new Chart (ctx, {
    type: 'bar',
    data: {
        datasets: [{
            borderWidth: 1,
            borderColor: 'rgba(207, 0, 15, 0.85)',
            fill: false,
            backgroundColor: 'rgba(255, 51, 51, 0.7)',
            opacity: 0.2
        }
    ]},
    plugins: [ChartDataSource],
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    max: 12000,
                    min: 0,
                }
            }]
        },
        plugins: {
            datasource: {
                url: 'virungaGorillas.xlsx'
            }
        }
    }
});


// Bwindi: Hippos graph
var ctx = document.getElementsByClassName("bar-chart3");

//Type, data, options

var chartGraph = new Chart (ctx, {
    type: 'bar',
    data: {
        datasets: [{
            borderWidth: 1,
            borderColor: 'rgba(34,139,34, 1)',
            fill: true,
            backgroundColor: 'rgba(154,205,50, 0.9)',
            opacity: 0.2
        }
    ]},
    plugins: [ChartDataSource],
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    max: 12000,
                    min: 0,
                }
            }]
        },
        plugins: {
            datasource: {
                url: 'queenHippos.xlsx'
            }
        }
    }
});


// Bwindi: gorillas graph
var ctx = document.getElementsByClassName("bar-chart4");

//Type, data, options

var chartGraph = new Chart (ctx, {
    type: 'bar',
    data: {
        datasets: [{
            borderWidth: 1,
            borderColor: 'rgba(207, 0, 15, 0.85)',
            fill: false,
            backgroundColor: 'rgba(255, 51, 51, 0.7)',
            opacity: 0.2
        }
    ]},
    plugins: [ChartDataSource],
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    max: 12000,
                    min: 0,
                }
            }]
        },
        plugins: {
            datasource: {
                url: 'queenGorillas.xlsx'
            }
        }
    }
});

// Bwindi: Elephants graph
var ctx = document.getElementsByClassName("bar-chart5");

//Type, data, options

var chartGraph = new Chart (ctx, {
    type: 'bar',
    data: {
        datasets: [{
            borderWidth: 1,
            borderColor: 'rgba(255, 102, 0, 1)',
            fill: false,
            backgroundColor: 'rgba(255, 163, 102, 0.9)',
            opacity: 0.2
        }
    ]},
    plugins: [ChartDataSource],
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    max: 12000,
                    min: 0,
                }
            }]
        },
        plugins: {
            datasource: {
                url: 'BwindiElephants.xlsx'
            }
        }
    }
});