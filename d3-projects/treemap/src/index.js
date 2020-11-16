/*
 * freeCodeCamp Data Visualization Certification
 * Project 5: Treemap
 * Alex Kozlov, 2020
 *
 * A treemap chart subdivides the plot area into rectangular cells,
 * where the size of each cell is proportional to an associated value.
 * This treemap plots the top most sold video game titles by platform.
 * The area of each cell (the "value") indicates the relative volume of
 * sales of the video game title. The color of each cell indicates the
 * gaming platform.
 */

import { json } from 'd3-fetch';
import plotTreemap from './d3/plotTreemap';

/*
 * Get the data and plot it.
 */

const URL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json";

document.addEventListener('DOMContentLoaded', () => {
  json(URL).then(json => plotTreemap(json));
});
