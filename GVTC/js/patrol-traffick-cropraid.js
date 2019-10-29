//adding the progress charts
$(function() {
    $('.chart').easyPieChart({
        scaleColor:false,
        lineWidth: 12,
        lineCap: 'square',
        trackColor: '#e5e5e5',
        barColor: '#228B22'
    });
});


// // Trafficking2016 graph
// var ctx = document.getElementsByClassName("bar-chart1");

// var chartGraph = new Chart (ctx, {
//     type: 'bar',
//     data: {
//         datasets: [{
//             borderWidth: 1,
//             borderColor: 'rgba(255, 165, 0, 1.8)',
//             fill: false,
//             backgroundColor: 'rgba(255, 239, 213, 1)',
//             opacity: 0.2
//         }
//     ]},
//     plugins: [ChartDataSource],
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     max: 400,
//                     min: 0,
//                 }
//             }]
//         },
//         plugins: {
//             datasource: {
//                 url: 'Trafficking2016.xlsx'
//             }
//         }
//     }
// });


// Trafficking2017 graph
var ctx = document.getElementsByClassName("bar-chart2");
var chartGraph = new Chart (ctx, {
    type: 'bar',
    data: {
        datasets: [{
            borderWidth: 1,
            borderColor: 'rgba(255, 165, 0, 1.8)',
            fill: false,
            backgroundColor: 'rgba(230,135,0, 1)',
            opacity: 0.4
        },
        {
            borderWidth: 1,
            borderColor: 'rgba(255, 165, 0, 1.8)',
            fill: false,
            backgroundColor: 'rgba(255,127,80,1)',
            opacity: 0.9
        }
    ]},
    plugins: [ChartDataSource],
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    max: 700,
                    min: 0,
                }
            }]
        },
        plugins: {
            datasource: {
                url: 'Trafficking2016and2017.xlsx'
            }
        }
    }
});


// crop raids Mgahinga graph
// var ctx = document.getElementsByClassName("bar-chart3");

// var chartGraph = new Chart (ctx, {
//     type: 'bar',
//     data: {
//         datasets: [{
//             borderWidth: 1,
//             borderColor: 'rgba(0, 32, 128, 1.8)',
//             fill: false,
//             backgroundColor: 'rgba(77, 121, 255, 0.7)',
//             opacity: 0.2
//         }
//     ]},
//     plugins: [ChartDataSource],
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     max: 10,
//                     min: 0,
//                 }
//             }]
//         },
//         plugins: {
//             datasource: {
//                 url: 'cropraidsMgahinga.xlsx'
//             }
//         }
//     }
// });


// crop raids Bwindi graph
var ctx = document.getElementsByClassName("bar-chart4");
var chartGraph = new Chart (ctx, {
    type: 'bar',
    data: {
        datasets: [{
            borderWidth: 1,
            borderColor: 'rgba(0, 32, 128, 1.8)',
            fill: false,
            backgroundColor: 'rgba(123,104,238, 1)',
            opacity: 1
        },
        {
            borderWidth: 1,
            borderColor: 'rgba(0, 32, 128, 1.8)',
            fill: false,
            backgroundColor: 'rgba(95,158,160,1)',
            opacity: 1
        }
    ]},
    plugins: [ChartDataSource],
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    max: 25,
                    min: 0,
                }
            }]
        },
        plugins: {
            datasource: {
                url: 'cropraidsBwindi.xlsx'
            }
        }
    }
});