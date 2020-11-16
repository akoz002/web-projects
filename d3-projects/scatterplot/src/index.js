/*
 * freeCodeCamp Data Visualization Certification
 * Project 2: Scatterplot
 * Alex Kozlov, 2020
 *
 * Plots a scatterplot with D3.js which presents doping allegations data
 * in professional cycling. The data points are color-coded to differentiate
 * between cyclists with and without doping allegations. A tooltip presents
 * additional information about each data point. The data is fetched with
 * AJAX.
 */

import plotScatterplot from './d3/plotScatterplot';

/*
 * Get the data and plot it.
 */

const URL = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";

document.addEventListener('DOMContentLoaded', () => {
  const req = new XMLHttpRequest();
  req.open('GET', URL, true);
  req.send();
  req.onload = () => {
    const dataset = JSON.parse(req.responseText);
    plotScatterplot(dataset);
  };
});
