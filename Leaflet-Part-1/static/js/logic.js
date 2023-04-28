const myURL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'

d3.json(myURL).then((data) => createFeatures(data));

let earthquakeCircles = []

function createFeatures(EarthquakeData) {

    for (let i = 0; i < EarthquakeData.features.length; i++) {
        depth = EarthquakeData.features[i].geometry.coordinates[2]
        earthquakeCircles.push(
            L.circle([EarthquakeData.features[i].geometry.coordinates[1], EarthquakeData.features[i].geometry.coordinates[0]], {
                fillOpacity: 0.5,
                color: getColour(depth),
                fillColor: getColour(depth),
                radius: EarthquakeData.features[i].properties.mag * 5000
            }).bindPopup(`<h2>${EarthquakeData.features[i].properties.place}</h2><h3>Magnitude: ${EarthquakeData.features[i].properties.mag}</h3><h3>Depth: ${depth} km</h3><hr><p>${new Date(EarthquakeData.features[i].properties.time)}</p>`)
            .bindTooltip(`Location: ${EarthquakeData.features[i].properties.place},<br>Magnitude: ${EarthquakeData.features[i].properties.mag}<br>Depth: ${depth} km`)
        )
    };

    createMap(earthquakeCircles);

    function getColour(d) {
        return d <= 10 ? '#24FF00' :
        d <= 20 ? '#58FF00' :
        d <= 30 ? '#8DFF00' :
        d <= 40 ? '#C2FF00' :
        d <= 50 ? '#F7FF00' :
        d <= 60 ? '#FFD300' :
        d <= 70 ? '#FF9E00' :
        d <= 80 ? '#FF6900' :
        d <= 90 ? '#FF3400' :
        '#FF0000';
    };
        
    const legend = L.control({
        position: 'bottomright'
    });
    
    legend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend'),
        grades = [-10, 10, 20, 30, 40, 50, 60, 70, 80, 90],
        labels = ['<strong>Depth</strong> (km)<strong>:</strong>'],
        from, to;

        for (var i=0; i<grades.length; i++) {
            from = grades[i];

            to = grades[i+1]-1;

            labels.push('<i style="background:' + getColour(from + 1) + '"></i> ' + from + (to ? '&ndash;' + to : '+'));
        };
        
        div.innerHTML = labels.join('<br>');
     
        return div;

    };
    
    legend.addTo(myMap);
    
};


function createMap(earthquakes) {
    let streetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    let earthquakeMap = L.layerGroup(earthquakeCircles)

    let baseMaps = {
        "Street Map": streetMap
    };

    let overlayMaps = {
        'Earthquakes': earthquakeMap
    };

    myMap = L.map("map", {
        center: [0, 0],
        zoom: 2,
        layers: [streetMap, earthquakeMap]
    });

};