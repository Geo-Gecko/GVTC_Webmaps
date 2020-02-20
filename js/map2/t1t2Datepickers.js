

let t1t2_datepickers = (
    id_, map_, tileObj, tile_adding_function, title_string
) => {

    var yearSelector = document.getElementById(id_);
    ["2015", "2016"].forEach(year => {
        var options = document.createElement("option")
        options.setAttribute("size", 16)
        if (id_ === "selector2" && year === "2016") {
            options.setAttribute("selected", "selected")
        } else if (id_ === "selector" && year === "2015") {
            options.setAttribute("selected", "selected")
        }
        options.textContent = year
        yearSelector.appendChild(options)
    })
    // update map_ on selecting different years
    function updateTileLayer() {
        // remove previous control and its layer if its on map_
        map_.removeLayer(tileObj.tile)
        tileObj.tile = tile_adding_function(yearSelector.value).addTo(map_)

        // update title of maps on the right
        let title_ = document.
            getElementsByClassName(title_string)[0].children[0]
        title_.textContent = yearSelector.value
    };
    yearSelector.addEventListener('change', updateTileLayer, false);

}
