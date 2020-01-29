
//hippo data for bwindi
let hip_sheet = "1116318864"
let long_id = "1-0V2d8gYHoCb7OZidsSBuVHfs30zaBW-sM6meBF02mw"
let url = `https://docs.google.com/spreadsheets/d/${long_id}/export?format=csv&id=${long_id}&gid=${hip_sheet}`


// add files from animalpopn folder to index.html
let hmap = document.createElement("script");
hmap.setAttribute("type", "text/javascript");
hmap.setAttribute("src", `js/animalpopn/animalCharts.js`);
document.body.appendChild(hmap)


axios.get(url, {
    mode: 'no-cors'
  })
  .then(r => {
    hippos4 = $.csv.toObjects(r.data)
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
let gorilla_sheet = "1422622650"
url = `https://docs.google.com/spreadsheets/d/${long_id}/export?format=csv&id=${long_id}&gid=${gorilla_sheet}`
axios.get(url, {
    mode: 'no-cors'
  })
  .then(r => {
    gorillas = $.csv.toObjects(r.data)
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
let elephant_sheet = "1933452056"
url = `https://docs.google.com/spreadsheets/d/${long_id}/export?format=csv&id=${long_id}&gid=${elephant_sheet}`
axios.get(url, {
    mode: 'no-cors'
  })
  .then(r => {
    elephants = $.csv.toObjects(r.data)
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
let gorilla2_sheet = "858359305"
url = `https://docs.google.com/spreadsheets/d/${long_id}/export?format=csv&id=${long_id}&gid=${gorilla2_sheet}`
axios.get(url, {
    mode: 'no-cors'
  })
  .then(r => {
    gorilla2 = $.csv.toObjects(r.data)
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
let hippos2_sheet = "944111397"
url = `https://docs.google.com/spreadsheets/d/${long_id}/export?format=csv&id=${long_id}&gid=${hippos2_sheet}`
axios.get(url, {
    mode: 'no-cors'
  })
  .then(r => {
    hippos2 = $.csv.toObjects(r.data)
    let x_values = []
    let y_values = []

    hippos2.forEach(hippos2 => {
      y_values.push(hippos2["hippos"])
      x_values.push(hippos2["Year"])

    })

    plotHippoVirunga(x_values, y_values);
  })
  .catch(e => console.log(e))

