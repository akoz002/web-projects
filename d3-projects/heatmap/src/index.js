/*
 * freeCodeCamp Data Visualization Certification
 * Project 3: Heat Map
 * Alex Kozlov, 2020
 *
 * Plots a heat map visualising global land surface temperature
 * over months and years. Each cell shows the temperature for a
 * given month of a given year. The temperature value is color
 * coded using the color scale shown in the legend. Each cell also
 * displays a tooltip showing the exact temperature value.
 */

import { json } from 'd3-fetch';
import plotHeatMap from './d3/plotHeatMap';

/*
 * Get the data with d3-fetch and plot it.
 */

const URL = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";

document.addEventListener('DOMContentLoaded', () => {
  json(URL).then(json => plotHeatMap(json));
});
