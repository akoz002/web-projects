/*
 * freeCodeCamp Data Visualization Certification
 * Project 1: Bar Chart
 * Alex Kozlov, 2020
 *
 * Uses the D3.js library to plot a bar chart of US GDP data over time.
 * On mouse-over the given bar is highlighted and a tooltip is displayed.
 * The chart resizes responsively. The data for plotting is fetched in
 * JSON format via AJAX.
 */

import plotBarChart from './d3/plotBarChart';

/*
 * Fetch the data with AJAX and plot it.
 */

const data_url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

document.addEventListener('DOMContentLoaded', () => {
  fetch(data_url)
    .then(response => response.json())
    .then(json => plotBarChart(json.data));
});
