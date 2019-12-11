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


// Trafficking2016 graph
var ctx = document.getElementsByClassName("bar-chart1");

var chartGraph = new Chart (ctx, {
    type: 'bar',
    data: {
        datasets: [{
            borderWidth: 1,
            borderColor: 'rgba(255, 165, 0, 1.8)',
            fill: false,
            backgroundColor: 'rgba(255, 239, 213, 1)',
            opacity: 0.2
        }
    ]},
    plugins: [ChartDataSource],
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    max: 400,
                    min: 0,
                }
            }]
        },
        plugins: {
            datasource: {
                url: 'Trafficking2016.xlsx'
            }
        }
    }
});


// Trafficking2017 graph
var ctx = document.getElementsByClassName("bar-chart2");
var chartGraph = new Chart (ctx, {
    type: 'bar',
    data: {
        datasets: [{
            borderWidth: 1,
            borderColor: 'rgba(255, 165, 0, 1.8)',
            fill: false,
            backgroundColor: 'rgba(255, 239, 213, 1)',
            opacity: 0.2
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
                url: 'Trafficking2017.xlsx'
            }
        }
    }
});


// crop raids Mgahinga graph
$.getJSON("https://spreadsheets.google.com/feeds/list/1D1vL8EI0uRzeiGM-A8hZLgUCexXrocw5B_qTGnCekNE/od6/public/basic?alt=json", function(data) {
  console.log(data);
  var seriesData = dataToSeries(data, 'date');
  $('#mainChart').JSC({
     yAxisScaleRangeMin: 0,
    series: seriesData
    });
});

function dataToSeries(data, xValues) {
  var seriesObjects = {};
  var entry = data.feed.entry;
  $.each(entry, function(index) {
    processRow(entry[index].content.$t);
  });
  console.log(seriesObjects);

  var series = [];
  $.each(seriesObjects, function(name) {
    series.push($.extend(seriesObjects[name], {
      name: name
    }));
    // processRow(entry[index].content.$t);
  });

  //Sort the series by name
  series.sort(function(a, b) {
    a = a.name;
    b = b.name;
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  });
  return series;

  function processRow(row) {
    var date, kvpArr = rowToKvp(row);
    $.each(kvpArr, function(i) {
      var kvp = kvpArr[i];
      if (kvp[0] === xValues.toLowerCase()) {
        date = kvp[1];
      } else {
        //If it's not a date column, it must be an data point.
        addPointToSeries(date, kvp);
      }
    });
  }

  function rowToKvp(row) {
    var result = [],
      columns = row.split(', ');

    $.each(columns, function(i) {
      var kvp = columns[i].split(': ');
      result[i] = kvp;
    });
    return result;
  }

  function addPointToSeries(date, kvp) {
    //kvp will be an array in this format [ seriesName, value]
    var seriesName = kvp[0];
    addToSeries({
      name: date,
      y: parseFloat(kvp[1])
    });

    function addToSeries(point) {
      var series;
      if (!(series = seriesObjects[seriesName])) {
        series = seriesObjects[seriesName] = {
          points: []
        };
      }
      series.points.push(point);
    }
  }
}


////////
var ctx = document.getElementsByClassName("bar-chart3");

var chartGraph = new Chart (ctx, {
    type: 'bar',
    data: {
        datasets: [{
            borderWidth: 1,
            borderColor: 'rgba(0, 32, 128, 1.8)',
            fill: false,
            backgroundColor: 'rgba(77, 121, 255, 0.7)',
            opacity: 0.2
        }
    ]},
    plugins: [ChartDataSource],
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    max: 10,
                    min: 0,
                }
            }]
        },
        plugins: {
            datasource: {
                url: 'https://docs.google.com/spreadsheets/d/1-0V2d8gYHoCb7OZidsSBuVHfs30zaBW-sM6meBF02mw/edit?usp=sharing'
            }
        }
    }
});


// crop raids Bwindi graph
var ctx = document.getElementsByClassName("bar-chart4");
var chartGraph = new Chart (ctx, {
    type: 'bar',
    data: {
        datasets: [{
            borderWidth: 1,
            borderColor: 'rgba(0, 32, 128, 1.8)',
            fill: false,
            backgroundColor: 'rgba(77, 121, 255, 0.7)',
            opacity: 0.2
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
