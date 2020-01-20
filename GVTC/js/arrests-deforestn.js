//forest loss in the parks
let forest_loss_sheet = "51326859"
let long_id = "1-0V2d8gYHoCb7OZidsSBuVHfs30zaBW-sM6meBF02mw"
let url = `https://docs.google.com/spreadsheets/d/${long_id}/export?format=csv&id=${long_id}&gid=${forest_loss_sheet}`

axios.get(url, {
    mode: 'no-cors'
  })
  .then(r => {
    forest_loss = $.csv.toObjects(r.data)
    let x_values = []
    let y_values = []

    forest_loss.forEach(forest_loss => {
      y_values.push(forest_loss["Parks_Forest loss (SqKm)"])
      x_values.push(forest_loss["Years"])
    })

    plotOne(x_values, y_values);
  })
  .catch(e => console.log(e))

function plotOne(xValues, yValues) {
  var ctxx = document.getElementsByClassName("bar-chart1");
  myEnrolChart = new Chart(ctxx, {
    type: 'bar',
    data: {
      labels: ["2015", "2016", "2017"],
      datasets: [
        {
          label: "Forest Loss In Park (Sq Km)",
          backgroundColor: 'rgba(50,205,50,1)',
          borderColor: 'rgba(0,100,0, 1)',
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

//forest loss for 5km buffer
let forest_loss_sheet2 = "51326859"
url = `https://docs.google.com/spreadsheets/d/${long_id}/export?format=csv&id=${long_id}&gid=${forest_loss_sheet2}`

axios.get(url, {
    mode: 'no-cors'
  })
  .then(r => {
    forest_loss = $.csv.toObjects(r.data)
    let x_values = []
    let y_values = []

    forest_loss.forEach(forest_loss => {
      y_values.push(forest_loss["Buffer_Forest loss (SqKm)"])
      x_values.push(forest_loss["Years"])
    })

    plotTwo(x_values, y_values);
  })
  .catch(e => console.log(e))

function plotTwo(xValues, yValues) {
  var ctxx = document.getElementsByClassName("bar-chart2");
  myEnrolChart = new Chart(ctxx, {
    type: 'bar',
    data: {
      labels: ["2015", "2016", "2017"],
      datasets: [
        {
          label: "Forest Loss In 5Km Buffer(Sq Km)",
          backgroundColor: 'rgba(50,205,50,1)',
          borderColor: 'rgba(0,100,0, 1)',
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

//forest loss for beni
let forest_loss_sheet3 = "51326859"
url = `https://docs.google.com/spreadsheets/d/${long_id}/export?format=csv&id=${long_id}&gid=${forest_loss_sheet3}`

axios.get(url, {
    mode: 'no-cors'
  })
  .then(r => {
    forest_loss = $.csv.toObjects(r.data)
    let x_values = []
    let y_values = []

    forest_loss.forEach(forest_loss => {
      y_values.push(forest_loss["Beni_Forest loss (SqKm)"])
      x_values.push(forest_loss["Years"])
    })

    plotThree(x_values, y_values);
  })
  .catch(e => console.log(e))

function plotThree(xValues, yValues) {
  var ctxx = document.getElementsByClassName("bar-chart3");
  myEnrolChart = new Chart(ctxx, {
    type: 'bar',
    data: {
      labels: ["2015", "2016", "2017"],
      datasets: [
        {
          label: "Forest Loss In Beni(Sq Km)",
          backgroundColor: 'rgba(50,205,50,1)',
          borderColor: 'rgba(0,100,0, 1)',
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

//slider for tables
$('.arrow-next').click(function() {
var currentSlide = $('.active-slide'),
nextSlide = currentSlide.next(),
currentDot = $('.active-dot'),
nextDot = currentDot.next();

if (nextSlide.length === 0) {
nextSlide = $('.slide').first();
nextDot = $('.dot').first();
}

currentSlide.fadeOut(600).removeClass('active-slide');
nextSlide.fadeIn(600).addClass('active-slide');

currentDot.removeClass('active-dot');
nextDot.addClass('active-dot');
});

$('.arrow-prev').click(function() {
var currentSlide = $('.active-slide'),
prevSlide = currentSlide.prev(),
currentDot = $('.active-dot'),
prevDot = currentDot.prev();

if (prevSlide.length === 0) {
prevSlide = $('.slide').last();
prevDot = $('.dot').last();
}

currentSlide.fadeOut(600).removeClass('active-slide');
prevSlide.fadeIn(600).addClass('active-slide');

currentDot.removeClass('active-dot');
prevDot.addClass('active-dot');
});

// this bit will resize the sliders height to make it responsive
$(window).on('load resize', function() {
var x = $('.active-slide img').height() + "px";

$('.slider').css('min-height', x);
$('p').text(x);
});

//this part will add a dot for each slider item, then assign a class name to the first child to get the active state
$('section').each(function() {
var a = $('.slide').length;
for (i = 0; i < a; i++) {
$('.slider-dots').append('<li class="dot">&bull;</li>');
}
});

$('.slider div:first').addClass('active-slide');
$('.slider-dots li:first').addClass('active-dot');


  // calling data from the sheet
  let arrests_sheet_ = "1581973011"
  let long_id_ = "1-0V2d8gYHoCb7OZidsSBuVHfs30zaBW-sM6meBF02mw"
  let url_ = `https://docs.google.com/spreadsheets/d/${long_id_}/export?format=csv&id=${long_id_}&gid=${arrests_sheet_}`

  axios.get(url_, {
      mode: 'no-cors'
    })
    .then(r => {
      let arrests = $.csv.toObjects(r.data)

      let years_ = []
      let no_of_tables = Object.keys(arrests[0])
      let past_yr = parseInt(no_of_tables[1].split("(")[1].split(")")[0])
      let recent_yr = parseInt(no_of_tables[Object.keys(arrests[0]).length - 1].split("(")[1].split(")")[0])

      while (past_yr <= recent_yr) {
        years_.push(past_yr)
        past_yr += 1
      }
      var slides = document.getElementById("tables_");

      years_.forEach((year) => {
        addTable(year);
      })

      // creating the table
      function addTable(year) {
        let slide_ = document.createElement("div")
        slide_.setAttribute("class", "slide")
        let t1 = document.createElement("div")
        t1.setAttribute("class", "table-responsive")
        t1.setAttribute("id", `myDynamicTable${year}`)
        let t2 = document.createElement('TABLE')
        t2.setAttribute("class", "table table-bordered")
        t2.setAttribute("id", "dataTable")
        t2.setAttribute("width", "100%")
        t1.appendChild(t2)

        var table = document.createElement('TABLE');
        table.border = '1';
        table.width = '100%';

        var tableHead = document.createElement('THEAD');
        table.appendChild(tableHead);

        var tableBody = document.createElement('TBODY');
        tableBody.padding = '10em';
        table.appendChild(tableBody);

        // data to be put in the rows for the table head
        var tr_ = document.createElement('TH');
        var tr1_ = document.createElement('TH');
        var tr2_ = document.createElement('TH');
        var tr3_ = document.createElement('TH');

        let di_ = document.createElement("div")
        di_.innerHTML += `<tr><th><span><div><h4>${arrests[4][`Arrested(${year})`]}</h4></div></span></th></tr>`
        tr_.appendChild(di_);
        let di1_ = document.createElement("div")
        // console.log(arrests[4][`Arrested(2017)`])
        di1_.innerHTML += `<tr><th><span><div><h4>${arrests[4][`Arrested(${year})`]} <img src="images/handcuffs3.png" height="60" width="75" align="middle"> </h4></div></span><br><h5>Arrested</h5></th></tr>`
        tr1_.appendChild(di1_);
        let di2_ = document.createElement("div")
        di2_.innerHTML += `<tr><th><h4>${arrests[4][`Prosecuted(${year})`]} <img src="images/prosecuted4.png" height="60" width="80" align="middle"> </h4><br><h5>Prosecuted</h5></th></tr>`
        tr2_.appendChild(di2_);
        let di3_ = document.createElement("div")
        di3_.innerHTML += `<tr><th><h4>${arrests[4][`Sentenced(${year})`]} <img src="images/sentenced.png" height="60" width="80" align="middle"> </h4><br><h5>Sentenced</h5></th></tr>`
        tr3_.appendChild(di3_);

        tableHead.appendChild(tr_);
        tableHead.appendChild(tr1_);
        tableHead.appendChild(tr2_);
        tableHead.appendChild(tr3_);

        // data to be put in the table columns
        let rows_ = []

        let arrest_data = arrests.slice(0, (arrests.length - 1))
        arrest_data.forEach(a => {

          let images_ = (value) => {
            vs_ = [];
            if (value < 50) {
              for (let x = 0; x < value; x++) {
                vs_.push('<img src="images/person1.png" width="11px" height="30px">')
              }
              return vs_
            }
            for (let x = 0; x < value; x += 10) {
              vs_.push('<img src="images/person1.png" width="11px" height="30px">')
            }
            return vs_
          }
          let man = '<img src="images/person1.png" width="11px" height="30px">'
          let row_ = document.createElement('TR')
          let td_ = document.createElement('TD');
          let td1_ = document.createElement('TD');
          let td2_ = document.createElement('TD');
          let td3_ = document.createElement('TD');

          let de_ = document.createElement("div")
          de_.innerHTML += `<strong>${a["Park"]}</strong>`
          td_.appendChild(de_);
          let de1_ = document.createElement("div")
          de1_.innerHTML +=
            `${a[`Arrested(${year})`] > 50 ? a[`Arrested(${year})`] + '<br><br><img src="images/person1.png" width="11px" height="30px"> = 10': a[`Arrested(${year})`] }<br/><br/>${images_(parseInt(a[`Arrested(${year})`])).join("")}`
          td1_.appendChild(de1_);
          let de2_ = document.createElement("div")
          de2_.innerHTML +=
            `${a[`Prosecuted(${year})`] > 50 ? a[`Prosecuted(${year})`] + '<br><br><img src="images/person1.png" width="11px" height="30px"> = 10': a[`Prosecuted(${year})`] }<br/><br/>${images_(parseInt(a[`Prosecuted(${year})`])).join("")}`
          td2_.appendChild(de2_);
          let de3_ = document.createElement("div")
          de3_.innerHTML +=
            `${a[`Sentenced(${year})`] > 50 ? a[`Sentenced(${year})`] + '<br><br><img src="images/person1.png" width="11px" height="30px"> = 10': a[`Sentenced(${year})`] }<br/><br/>${images_(parseInt(a[`Sentenced(${year})`])).join("")}`
          td3_.appendChild(de3_);

          row_.appendChild(td_);
          row_.appendChild(td1_);
          row_.appendChild(td2_);
          row_.appendChild(td3_);
          rows_.push(row_)
        })
        rows_.forEach(row => tableBody.appendChild(row))
        t1.appendChild(table);
        slide_.appendChild(t1)
        slides.appendChild(slide_)
      }
    })
    .catch(e => console.log(e))
