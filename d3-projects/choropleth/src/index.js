/*
 * freeCodeCamp Data Visualization Certification
 * Project 4: Choropleth Map
 * Alex Kozlov, 2020
 *
 * A choropleth is a geographic map which uses color to encode
 * additional information. This choropleth plots a map of the U.S.
 * by state and county. Each county is color coded to show the
 * education level of its residents. On hover a tooltip shows the
 * county name and the exact percentage education level.
 */

import plotChoropleth from './d3/plotChoropleth';

/*
 * Fetch both datasets and plot the map.
 */

const EDU_URL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";
const COUNTY_URL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";

document.addEventListener('DOMContentLoaded', () => {
  Promise.all([
    fetch(EDU_URL).then(response => response.json()),
    fetch(COUNTY_URL).then(response => response.json())
  ]).then(([eduDataset, countyDataset]) => {
    plotChoropleth(eduDataset, countyDataset);
  });
});
