

{/* <div class="tooltip_map">
    <img id="info" src="images/info.png">
        <div class="tooltiptext">
            The data currently displayed for landcover was generated by Greater Virunga Transboundary Collaboration (GVTC) and represents the land cover for the Greater Virunga Landscape (GVL) as per 2017.
          </div>
        </div>
    <div class="tooltip_map2">
        <img id="info2" src="images/info.png">
            <div class="tooltiptext2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.
          </div>
        </div> */}

let tooltip = document.createElement("img")
tooltip.setAttribute("src", "images/info.png")
tooltip.setAttribute("style", "width: 50%; margin-left: 10%;")
let tooltiptext = document.createElement("div")
tooltiptext.setAttribute("class", "tooltiptext")
tooltiptext.setAttribute("style", " font-size: 14px; line-height: 1;")
tooltiptext.textContent =
    "The data currently displayed for household poverty was generated by \
    UBOS/UNICEF and represents the household poverty rates for the parishes \
    in the Greater Virunga Landscape (GVL) as per 2012/13"

let parentDiv = document.createElement("div")
parentDiv.setAttribute("class", "tooltip_map")
parentDiv.appendChild(tooltip)
parentDiv.appendChild(tooltiptext)

let tooltip2 = document.createElement("img")
tooltip2.setAttribute("src", "images/info.png")
tooltip2.setAttribute("style", "width: 50%; margin-left: 10%;")
let tooltip2text = document.createElement("div")
tooltip2text.setAttribute("class", "tooltiptext")
tooltip2text.setAttribute("style", " font-size: 14px; line-height: 1;")
tooltip2text.textContent =
    "The data currently displayed for landcover was generated by Greater \
    Virunga Transboundary Collaboration (GVTC) and represents the land cover\
     for the Greater Virunga Landscape (GVL) as per 2017."

let parentDiv2 = document.createElement("div")
parentDiv2.setAttribute("class", "tooltip_map")
parentDiv2.appendChild(tooltip2)
parentDiv2.appendChild(tooltip2text)