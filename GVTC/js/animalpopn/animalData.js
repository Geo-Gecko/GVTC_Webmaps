
//hippo data for bwindi
let hip_sheet = "Hippos_Bwindi_Infographics"
let long_id = "1-0V2d8gYHoCb7OZidsSBuVHfs30zaBW-sM6meBF02mw"
let url = `https://sheets.googleapis.com/v4/spreadsheets/${long_id}/values/${hip_sheet}?key=AIzaSyC_iis9BnBJl7qxK_fRV6Hd5GpNFzFkxNY`


// add files from animalpopn folder to index.html
let hmap = document.createElement("script");
hmap.setAttribute("type", "text/javascript");
hmap.setAttribute("src", `js/animalpopn/animalCharts.js`);
document.body.appendChild(hmap)


axios.get(url, {
    mode: 'no-cors'
  })
  .then(r => {
    hippos4 = create_response_array_object(r.data)
    let x_values = []
    let y_values = []

    hippos4.forEach(hippo => {
      y_values.push(hippo["hippos"])
      x_values.push(hippo["Year"])

    })

    plotHippoBwindi(x_values, y_values);
  })
  .catch(e => console.log(e))


//gorilla data for bwindi
let gorilla_sheet = "Gorillas_Bwindi_Infographics"
url = `https://sheets.googleapis.com/v4/spreadsheets/${long_id}/values/${gorilla_sheet}?key=AIzaSyC_iis9BnBJl7qxK_fRV6Hd5GpNFzFkxNY`
axios.get(url, {
    mode: 'no-cors'
  })
  .then(r => {
    gorillas = create_response_array_object(r.data)
    let x_values = []
    let y_values = []

    gorillas.forEach(gorilla => {
      y_values.push(gorilla["gorillas"])
      x_values.push(gorilla["Year"])

    })

    plotGorillaBwindi(x_values, y_values);
  })
  .catch(e => console.log(e))


// elephant data for bwindi
let elephant_sheet = "Elephants_Bwindi_Infographics"
url = `https://sheets.googleapis.com/v4/spreadsheets/${long_id}/values/${elephant_sheet}?key=AIzaSyC_iis9BnBJl7qxK_fRV6Hd5GpNFzFkxNY`
axios.get(url, {
    mode: 'no-cors'
  })
  .then(r => {
    elephants = create_response_array_object(r.data)
    let x_values = []
    let y_values = []

    elephants.forEach(elephant => {
      y_values.push(elephant["elephants"])
      x_values.push(elephant["Year"])

    })

    plotElephantBwindi(x_values, y_values);
  })
  .catch(e => console.log(e))



// gorilla data for virunga
let gorilla2_sheet = "Gorillas_Virunga_Infographics"
url = `https://sheets.googleapis.com/v4/spreadsheets/${long_id}/values/${gorilla2_sheet}?key=AIzaSyC_iis9BnBJl7qxK_fRV6Hd5GpNFzFkxNY`
axios.get(url, {
    mode: 'no-cors'
  })
  .then(r => {
    gorilla2 = create_response_array_object(r.data)
    let x_values = []
    let y_values = []

    gorilla2.forEach(gorilla2 => {
      y_values.push(gorilla2["gorillas"])
      x_values.push(gorilla2["Year"])

    })

    plotGorillaVirunga(x_values, y_values);
  })
  .catch(e => console.log(e))


// hippos data for virunga
let hippos2_sheet = "Hippos_Virunga_Infographics"
url = `https://sheets.googleapis.com/v4/spreadsheets/${long_id}/values/${hippos2_sheet}?key=AIzaSyC_iis9BnBJl7qxK_fRV6Hd5GpNFzFkxNY`
axios.get(url, {
    mode: 'no-cors'
  })
  .then(r => {
    hippos2 = create_response_array_object(r.data)
    let x_values = []
    let y_values = []

    hippos2.forEach(hippos2 => {
      y_values.push(hippos2["hippos"])
      x_values.push(hippos2["Year"])

    })

    plotHippoVirunga(x_values, y_values);
  })
  .catch(e => console.log(e))


let nav_height = $(
  ".navbar.fixed-top.row.navigation_dashboard"
).height()
let window_height = $(window).height()
$("#panel_d").css("top", `${((nav_height / window_height) * 100) - 1}%`)
$("#panel_d").css("height", `${(101 - (nav_height / window_height) * 100)}%`)
