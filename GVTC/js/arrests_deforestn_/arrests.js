
// calling data from the sheet
let arrests_sheet_ = "Arrests"
let long_id_ = "1-0V2d8gYHoCb7OZidsSBuVHfs30zaBW-sM6meBF02mw"
let url_ = `https://sheets.googleapis.com/v4/spreadsheets/${long_id}/values/${arrests_sheet_}?key=AIzaSyC_iis9BnBJl7qxK_fRV6Hd5GpNFzFkxNY`

axios.get(url_, { mode: 'no-cors' })
    .then(r => {
        let arrests = create_response_array_object(r.data)

        let years_ = []
        let no_of_tables = Object.keys(arrests[0])
        let past_yr = parseInt(no_of_tables[1].split("(")[1].split(")")[0])
        let recent_yr = parseInt(no_of_tables[Object.keys(arrests[0]).length - 1].split("(")[1].split(")")[0])

        while (past_yr <= recent_yr) {
            years_.push(past_yr)
            past_yr += 1
        }
        var slides = document.getElementById("tables_");

        years_.forEach((year, i) => {
            addTable(year, i);
        })

        // creating the table
        function addTable(year, i) {
            let slide_ = document.createElement("div")
            slide_.setAttribute("class", "slide")
            if (i === 0) {
                slide_.setAttribute("class", "slide active-slide")
            }
            slide_.setAttribute("style", "position: relative;")
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
            tableBody.padding = '1em';
            table.appendChild(tableBody);

            // data to be put in the rows for the table head
            var tr_ = document.createElement('TH');
            var tr1_ = document.createElement('TH');
            var tr2_ = document.createElement('TH');
            var tr3_ = document.createElement('TH');

            let di_ = document.createElement("div")
            di_.innerHTML += `<tr><th><span><div><h4>${year}</h4></div></span></th></tr>`
            tr_.appendChild(di_);
            let di1_ = document.createElement("div")
            // console.log(arrests[4][`Arrested(2017)`])
            di1_.innerHTML += `<tr><th><span><div><h4>${arrests[4][`Arrested(${year})`]} <img src="images/handcuffs3.png" height="60" width="75" align="middle"> </h4></div></span><h5>Arrested</h5></th></tr>`
            tr1_.appendChild(di1_);
            let di2_ = document.createElement("div")
            di2_.innerHTML += `<tr><th><h4>${arrests[4][`Prosecuted(${year})`]} <img src="images/prosecuted4.png" height="60" width="80" align="middle"> </h4><h5>Prosecuted</h5></th></tr>`
            tr2_.appendChild(di2_);
            let di3_ = document.createElement("div")
            di3_.innerHTML += `<tr><th><h4>${arrests[4][`Sentenced(${year})`]} <img src="images/sentenced.png" height="60" width="80" align="middle"> </h4><h5>Sentenced</h5></th></tr>`
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
                    `${a[`Arrested(${year})`] > 50 ? a[`Arrested(${year})`] + '<br><img src="images/person1.png" width="11px" height="30px"> = 10' : a[`Arrested(${year})`]}<br/>${images_(parseInt(a[`Arrested(${year})`])).join("")}`
                td1_.appendChild(de1_);
                let de2_ = document.createElement("div")
                de2_.innerHTML +=
                    `${a[`Prosecuted(${year})`] > 50 ? a[`Prosecuted(${year})`] + '<br><img src="images/person1.png" width="11px" height="30px"> = 10' : a[`Prosecuted(${year})`]}<br/>${images_(parseInt(a[`Prosecuted(${year})`])).join("")}`
                td2_.appendChild(de2_);
                let de3_ = document.createElement("div")
                de3_.innerHTML +=
                    `${a[`Sentenced(${year})`] > 50 ? a[`Sentenced(${year})`] + '<br><img src="images/person1.png" width="11px" height="30px"> = 10' : a[`Sentenced(${year})`]}<br/>${images_(parseInt(a[`Sentenced(${year})`])).join("")}`
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
