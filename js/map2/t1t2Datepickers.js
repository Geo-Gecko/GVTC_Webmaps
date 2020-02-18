

let t1t2_datepickers = (id_, map_, years, basemap_, den_caller) => {

    let layerControl = L.control.layers(basemap_, "", {
        collapsed: true,
        sortLayers: true
    }).addTo(map_);
    var yearSelector = document.getElementById(id_);
    years.forEach(year => {
        var options = document.createElement("option")
        options.textContent = year
        yearSelector.appendChild(options)
    })

    // update map_ on selecting different years
    function updatePopnDensity() {
        // remove previous control and its layer if its on map_
        if (basemap_[`Population Density ${id_}`]) {
            layerControl.removeLayer(basemap_[`Population Density ${id_}`])
            map_.removeLayer(basemap_[`Population Density ${id_}`])
        }

        //calling geosjon and style for density
        popngeoJson_ = {}
        density_data.forEach(point => {
            popngeoJson_[point["NAME"]] = parseInt(
                point[`pop_density_${yearSelector.value}`]
            )
        });
        var den = den_caller()
        basemap_[`Population Density ${id_}`] = den
        layerControl.addBaseLayer(
            basemap_[`Population Density ${id_}`], `Population Density ${id_}`
        )
        // turn on basemap
        $(`span:contains(Population Density ${id_})`).click()
    };
    yearSelector.addEventListener('change', updatePopnDensity, false);

}
