

let t1t2_datepickers = (id_, map_, tileObj, tile_adding_function) => {

    var yearSelector = document.getElementById(id_);
    ["2015", "2016"].forEach(year => {
        var options = document.createElement("option")
        options.textContent = year
        yearSelector.appendChild(options)
    })

    // update map_ on selecting different years
    function updateTileLayer() {
        // remove previous control and its layer if its on map_
        map_.removeLayer(tileObj.tile)
        tileObj.tile = tile_adding_function(yearSelector.value).addTo(map_)
    };
    yearSelector.addEventListener('change', updateTileLayer, false);

}
