

//calling density data from google sheets
let density_sheet = "251717838"
url = `https://docs.google.com/spreadsheets/d/${long_id}/export?format=csv&id=${long_id}&gid=${density_sheet}`
axios.get(url, {
    mode: 'no-cors'
})
    .then(r => {
        density_data = $.csv.toObjects(r.data),
            density_data.forEach(point => {
                popngeoJson_[point["NAME"]] = parseInt(point["pop_density"])
            })

        //calling geosjon and style for density
        var den = L.geoJson(density, {
            style: styledensity
        })

        //creating layer for density
        baseMaps["Population Density"] = den

    })
    .catch(e => console.log(e))

//calling poverty data from google sheets
let poverty_sheet = "2065427744"
url = `https://docs.google.com/spreadsheets/d/${long_id}/export?format=csv&id=${long_id}&gid=${poverty_sheet}`
axios.get(url, {
    mode: 'no-cors'
})
    .then(r => {
        poverty_data = $.csv.toObjects(r.data),
            poverty_data.forEach(point => {
                povgeoJson[point["SNAME2014"]] = parseFloat(point["Poverty_5"])
            })

        //calling geosjon and style for poverty
        var pov = L.geoJson(poverty, {
            style: stylepoverty
        });

        //creating layer for poverty, landcover and conflicts
        baseMaps["Household Poverty Rates"] = pov
        baseMaps["LandCover Classification"] = landcover

        L.control.layers(baseMaps, "", {
            collapsed: false,
        }).addTo(map);
    })
    .catch(e => console.log(e))


  //calling conflict data from google sheets
  // let conflict_sheet = "990779069"
  // url = `https://docs.google.com/spreadsheets/d/${long_id}/export?format=csv&id=${long_id}&gid=${conflict_sheet}`
  // axios.get(url, {
  //     mode: 'no-cors'
  //   })
  //   .then(r => {
  //     conflict_data = $.csv.toObjects(r.data),
  //       conflict_data.forEach(point => {
  //         congeoJson[point["Name"]] = parseFloat(point["conflict_"])
  //       })

        //calling geosjon and style for conflict
        // map.createPane('conflictpane');
        // map.getPane('conflictpane').style.zIndex = 650;
        // var conflict = L.geoJson(Conflict, {
        //   pane: 'conflictpane'
        // });

        //creating layer for conflicts
    //     var layMaps = {
    //       "Boundary Conflicts": conflict
    //     };
    //
    //           L.control.layers("", layMaps, {
    //             collapsed: false,
    //           }).addTo(map);
    //
    //
    // })
    // .catch(e => console.log(e))
