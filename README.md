# Earthquakes around the world in the last 7 days (Leaflet *Challenge 15*)

This repository contains a mini-project in which I created a [**world map**](https://dan-murillo.github.io/leaflet-challenge/Leaflet-Part-1/index.html) with information about all the earthquakes that have occured all around the world in the last seven days.

## Author

Daniel Ramón Murillo Antuna [@dan-murillo](https://www.github.com/dan-murillo)

## Repository description

Did you know that there are approximately 385 earthquakes worldwide per week? According to the United States Geological Survey (USGS), about 20,000 earthquakes occur every year —*which gives us an average of 384.62 earthquakes per week*—. This number fluctuates every year, so the Survey asserts that temporary increases or decreases in seismic activity among some years is normal.

Apart from providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change, the USGS is building a new set of tools that will enable the visualisation of earthquake data among different periods. However, these visualisations are currently very limited.

Hence, I created a visualistion that uses the USGS API to collect updated earthquake data of the last seven days, [you can find the link to the GeoJSON used here](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson), and displays the data as a world map with colour-coded seismic activity with size-proportional markers —*the larger the markers, the higher the magnitude of the earthquake*—. A legend was added to the map to explain the colour-coding system used —*the darker the colour, the deeper the earthquake's coordinates reported*—. Once the coding process was complete, the visualisation was deployed to GitHub Pages.

This repository contains the HTML, CSS, and JS code used to build the world map. The following image portrays how the visualisation looks online:
![image](https://github.com/daniel-r-murillo-antuna/leaflet-challenge/blob/main/Leaflet-Part-1/final-visualisation.png)

### The *Leaflet-Part-1* folder:

It contains the HTML, CSS, and JS code of the world map and an image of the final visualisation. This folder is titled 'part 1' because there was to be a part 2 of this project, which would have added more data, more overlay maps, and the visualisations of the tectonic plates. However, the development of part 2 is currently stopped.

## Data Reference

United States Geological Survey. 2023. GeoJSON Summary Format. Retrieved April 27, 2023, from [https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson). 

```#Thank you for reading me!```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
