

// const map = L.map('map').setView([37.8, -96], 4);
const map = L.map('map').setView([53.7023545, -3.2765753], 5.5);


// const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
// 	maxZoom: 19,
// 	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// }).addTo(map);

const tiles =L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// control that shows state info on hover
const info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};

info.update = function (props) {
    const contents = props ? `<b>${props.name}</b><br />${props.density} %` : 'Hover over a region';
    this._div.innerHTML = `<h6>UK Immigrant Employment Population Density</h6>${contents}`;
};

info.addTo(map);


// get color depending on population density value
function getColor(d) {
    return d > 72 ? '#800026' :
        d > 70  ? '#BD0026' :
        d > 68  ? '#E31A1C' :
        d > 66  ? '#FC4E2A' :
        d > 64   ? '#FD8D3C' :
        d > 62   ? '#FEB24C' :
        d > 60   ? '#FED976' : '#FFEDA0';
}

function style(feature) {
    return {
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.85,
        fillColor: getColor(feature.properties.density)
    };
}

function highlightFeature(e) {
    const layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    layer.bringToFront();

    info.update(layer.feature.properties);

}

/* global statesData */
const geojson = L.geoJson(statesData, {
    style,
    onEachFeature
}).addTo(map);

function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
    // Print the name of the region to the console
    filterdatabyRegion(e.target.feature.properties.name);
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

map.attributionControl.addAttribution('Office for National Statistics; <a href="https://www.ons.gov.uk/census">UK Census Bureau</a>');


const legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    const div = L.DomUtil.create('div', 'info legend');
    const grades = [60, 62, 64, 66, 68, 70, 72];
    const labels = [];
    let from, to;

    for (let i = 0; i < grades.length; i++) {
        from = grades[i];
        to = grades[i + 1];

        // labels.push(`<i style="background:${getColor(from + 1)}"></i> ${from}${to ? `&ndash;${to}` : '+'}`);
        labels.push(`<i style="background:${getColor(from + 1)}"></i> ${from}${to ? `&ndash;${to}` : '+'}` + '%');
    }

    div.innerHTML = labels.join('<br>');
    return div;
};

legend.addTo(map);