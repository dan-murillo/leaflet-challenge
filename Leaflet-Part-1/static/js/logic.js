const myURL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'

d3.json(myURL).then((data) => createFeatures(data));

let earthquakeCircles = []

function createFeatures(EarthquakeData) {

    for (let i = 0; i < EarthquakeData.features.length; i++) {
        depth = EarthquakeData.features[i].geometry.coordinates[2]
        console.log(depth)
        earthquakeCircles.push(
            L.circle([EarthquakeData.features[i].geometry.coordinates[1], EarthquakeData.features[i].geometry.coordinates[0]], {
                fillOpacity: 0.5,
                color: getColour(depth),
                fillColor: getColour(depth),
                radius: EarthquakeData.features[i].properties.mag * 5000
            }).bindPopup(`<h2>${EarthquakeData.features[i].properties.place}</h2><h3>Magnitude: ${EarthquakeData.features[i].properties.mag}</h3><h3>Depth: ${depth}</h3><hr><p>${new Date(EarthquakeData.features[i].properties.time)}</p>`)
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
        const div = L.DomUtil.create('div', 'info legend');
        let grades = [-10, 10, 20, 30, 40, 50, 60, 70, 80, 90];
        let labels = [];
    
        for (var i=0; i<grades.length; i++) {
            div.innerHTML += '<i style="background:' + getColour(grades[i] + 1) + '"></i>' + grades[i] + (grades[i+1] ? '&ndash;' + grades[i+1] + '<br>' : '+');
        }
    
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

    // L.control.layers(null, overlayMaps).addTo(myMap); //??

    // let info = L.control({
    //     position: 'bottomright'
    // });

    // info.onAdd = function() {
    //     let div = L.DomUtil.create('div', 'legend');
    //     return div;
    // };
    
    // info.addTo(myMap);

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





// function getColour(d) {
//         var colour;
//         if (d <= 61.6966) {
//             colour = '#24FF00'
//         } else if (d <= 126.5932) {
//             colour = '#58FF00'
//         } else if (d <= 191.4898) {
//             colour = '#8DFF00'
//         } else if (d <= 256.3864) {
//             colour = '#C2FF00'
//         } else if (d <= 321.283) {
//             colour = '#F7FF00'
//         } else if (d <= 386.1796) {
//             colour = '#FFD300'
//         } else if (d <= 451.0762) {
//             colour = '#FF9E00'
//         } else if (d <= 515.9728) {
//             colour = '#FF6900'
//         } else if (d <= 580.8694) {
//             colour = '#FF3400'
//         } else if (d > 580.8694) {
//             colour = '#FF0000'
//         };
//         return colour;
//     };





// function getColour(d) {
//     var colour;
//     if (d <= 10) {
//         colour = '#24FF00'
//     } else if (d <= 20) {
//         colour = '#58FF00'
//     } else if (d <= 30) {
//         colour = '#8DFF00'
//     } else if (d <= 40) {
//         colour = '#C2FF00'
//     } else if (d <= 50) {
//         colour = '#F7FF00'
//     } else if (d <= 60) {
//         colour = '#FFD300'
//     } else if (d <= 70) {
//         colour = '#FF9E00'
//     } else if (d <= 80) {
//         colour = '#FF6900'
//     } else if (d <= 90) {
//         colour = '#FF3400'
//     } else if (d > 90) {
//         colour = '#FF0000'
//     };
//     return colour;
// };