const myURL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'

d3.json(myURL).then((data) => createFeatures(data));

let earthquakeCircles = []

function createFeatures(EarthquakeData) {

    L.geoJSON(EarthquakeData);

    for (let i = 0; i < EarthquakeData.features.length; i++) {
        earthquakeCircles.push(
            L.circle([EarthquakeData.features[i].geometry.coordinates[1], EarthquakeData.features[i].geometry.coordinates[0]], {
                fillOpacity: 0.75,
                color: 'red',
                fillColor: 'yellow',
                radius: EarthquakeData.features[i].properties.mag * 5000
            }).bindPopup(`<h2>${EarthquakeData.features[i].properties.place}</h2><h3>Magnitude: ${EarthquakeData.features[i].properties.mag}</h3><hr><p>${new Date(EarthquakeData.features[i].properties.time)}</p>`)
        )
    }

    createMap(earthquakeCircles);
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
}




// // Loop through the countries array.
// var color;
// countries.forEach((country) => {
  
//   // Conditionals for country points
//   if(country.gdp_pc > 100000) color = 'yellow';
//   else if(country.gdp_pc > 75000) color = 'blue';
//   else if(country.gdp_pc > 50000) color = 'green';
//   else color = 'violet';

//   // Add circles to the map.
//   // Adjust the radius.
//   L.circle(country.location, {
//     fillOpacity: 0.75,
//     color: 'white',
//     fillColor: color,
//     radius: Math.sqrt(country.gdp_pc) * 700
//   }).bindPopup(`<h1>${country.name}</h1> <hr> <h3>Per Capita GDP: ${country.gdp_pc}`).addTo(myMap)
// });





// function createFeatures(lastWeekEarthquakeData) ORIGINAL:
// function createFeatures(lastWeekEarthquakeData) {
//     function onEachFeature(feature, layer) {
//         layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`)
//     };

//     let earthquakes = L.geoJSON(lastWeekEarthquakeData, {
//         onEachFeature: onEachFeature
//     });

//     createMap(earthquakes);
// };


// SIZE = magnitude of earthquake
// COLOR = depth of the earthquake
// TRY 16000:
// function createFeatures(lastWeekEarthquakeData) {
//     function onEachFeature(feature, layer) {
//         layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`)
//     };

//     let earthquakes = L.circleMarker([lastWeekEarthquakeData.geometry], {
//         color: 'darkred',
//         weight: 2,
//         fillCollor: 'yellow',
//         fillOpacity: .5,
//         radius: lastWeekEarthquakeData.mag
//     });

//     createMap(earthquakes);
// };


// TRY 15000:
// function createFeatures(lastWeekEarthquakeData) {
    
//     let earthquakes = lastWeekEarthquakeData.forEach((earthquake) => {
//             L.circle([earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0]], {
//                 color: '#3f0010',
//                 fillOpacity: earthquake.geometry.coordinates[2],
//                 radius: earthquake.properties.mag
//             }).bindPopup(`<h3>${earthquake.properties.place}</h3><hr><p>${new Date(earthquake.properties.time)}</p>`)
//     });

//     createMap(earthquakes);
// }



// function markerSize(population) {
//     return Math.sqrt(population) * 50;
//   }

