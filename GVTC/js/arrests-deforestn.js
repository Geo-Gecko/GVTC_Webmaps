// Virunga: Hippos graph
var ctx = document.getElementsByClassName("bar-chart1");

//Type, data, options

var chartGraph = new Chart (ctx, {
    type: 'bar',
    data: {
        datasets: [{
            borderWidth: 1,
            borderColor: 'rgba(0,100,0, 1)',
            fill: false,
            backgroundColor: 'rgba(50,205,50,1)',
            opacity: 0.2
        }
    ]},
    plugins: [ChartDataSource],
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    max: 70,
                    min: 0,
                }
            }]
        },
        plugins: {
            datasource: {
                url: 'deforestationpark.xlsx'
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
            borderColor: 'rgba(0,100,0, 1)',
            fill: false,
            backgroundColor: 'rgba(50,205,50,1)',
            opacity: 0.2
        }
    ]},
    plugins: [ChartDataSource],
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    max: 50,
                    min: 0,
                }
            }]
        },
        plugins: {
            datasource: {
                url: 'deforestationbuffer.xlsx'
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
            borderColor: 'rgba(0,100,0, 1)',
            fill: false,
            backgroundColor: 'rgba(50,205,50,1)',
            opacity: 0.2
        }
    ]},
    plugins: [ChartDataSource],
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    max: 12,
                    min: 0,
                }
            }]
        },
        plugins: {
            datasource: {
                url: 'deforestationbeni.xlsx'
            }
        }
    }
});