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

/*
 * Global parameters.
 */

const CANVAS_WIDTH = 1600;
const CANVAS_HEIGHT = 900;
const PADDING_TOP = 200;
const PADDING_BOT = 0;
const PADDING_LEFT = 0;
const PADDING_RIGHT = 0;

const PLOT_WIDTH = CANVAS_WIDTH - PADDING_LEFT - PADDING_RIGHT;
const PLOT_HEIGHT = CANVAS_HEIGHT - PADDING_TOP - PADDING_BOT;

/*
 * Adds title and description.
 */

const addTitle = () => {
  d3.select('body')
    .append('h1')
      .attr('id', 'title')
      .text('Video Game Sales');
  
  d3.select('body')
    .append('p')
      .attr('id', 'description')
      .text('Top 100 Most Sold Video Games by Platform');
};

/*
 * Gets a discrete color scale mapping platform names to colors.
 */

const getColorScale = dataset => {
  // the domain is the platform names
  const domain = dataset.children.map(platform => platform.name);
  
  // manually construct a discrete scale of 18 colors
  const colorsDiscrete = d3.scaleOrdinal()
      .domain(domain)
      .range(d3.schemeSet3.concat([
        d3.schemePastel2[7],
        d3.schemePastel2[6],
        'mintcream',
        'lavender',
        'lightcyan',
        'lightgreen'
      ]));
  
  return colorsDiscrete;
};

/*
 * Plot the legend.
 */

const plotLegend = colorScale => {
  const legendX = CANVAS_WIDTH * 0.09;
  const legendY = 5;
  const numberOfColumns = 6;
  const columnWidth = 240;
  const rowHeight = 60;
  const tileSize = 40;
  
  // create the main legend group
  d3.select('svg')
    .append('g')
      .attr('id', 'legend')
      .attr('transform', `translate(${legendX}, ${legendY})`);
  
  // dataset containing x, y positions of each legend cell
  const legendData = colorScale.domain().map((platform, i) => ({
    x: i % numberOfColumns * columnWidth,
    y: Math.floor(i / numberOfColumns) * rowHeight,
    platform
  }));
  
  // bind data and plot the legend cell groups
  d3.select('#legend')
    .selectAll('.legend-cell')
    .data(legendData)
    .enter()
    .append('g')
      .attr('transform', d => `translate(${d.x}, ${d.y})`)
      .attr('class', 'legend-cell');
  
  // plot the legend tiles
  d3.selectAll('.legend-cell')
    .append('rect')
      .attr('width', tileSize)
      .attr('height', tileSize)
      .attr('class', 'legend-item')
      .attr('fill', d => colorScale(d.platform));
  
  // plot the legend labels
  d3.selectAll('.legend-cell')
    .append('text')
      .attr('x', tileSize * 1.3)
      .attr('y', tileSize * 0.8)
      .attr('class', 'legend-label')
      .text(d => '- ' + d.platform);

};
 
/*
 * Adds tooltip and highlight overlay.
 */

const addTooltip = colorScale => {
  // create the tooltip div
  d3.select('#svg-div')
    .append('div')
      .attr('id', 'tooltip')
      .style('opacity', 0);
  
  // create the highlight overlay
  d3.select('svg')
    .append('rect')
      .attr('id', 'overlay')
      .style('opacity', 0);
  
  // add the mouseover event handlers
  d3.selectAll('.tile')
      .on('mouseover', (d, i, nodes) => {
        const rect = nodes[i];
        const {name, category, value} = rect.dataset;
        const x = d.x0 + PADDING_LEFT;
        const y = d.y0 + PADDING_TOP;
        const width = d.x1 - d.x0;
        const height = d.y1 - d.y0;
    
        // position the tooltip
        // create a 15% right margin
        const tooltipX = Math.min(
          (x + width * 0.25) / CANVAS_WIDTH * 100,
          85                       
        );
        const tooltipY = (y / CANVAS_HEIGHT * 100) - 17;
    
        d3.select('#tooltip')
            .attr('data-value', value)
            .style('left', `${tooltipX}%`)
            .style('top', `${tooltipY}%`)
            .html(`<b>Title:</b> ${name}<br>` + 
                  `<b>Platform:</b> ${category}<br>` +
                  `<b>Value:</b> ${value}`)
          .transition()
            .duration(200)
            .style('opacity', 0.95);
    
        // position the overlay
        d3.select('#overlay')
            .attr('x', x)
            .attr('y', y)
            .attr('width', width)
            .attr('height', height)
            .style('opacity', 1);
      })
      .on('mouseout', () => {
        // fade out the tooltip and the overlay
        d3.select('#tooltip')
          .transition()
            .duration(200)
            .style('opacity', 0);
     
        d3.select('#overlay')
            .style('opacity', 0);
      });
};

/*
 * The top level function to plot the treemap.
 */

const plotTreemap = dataset => {
  // add title and description
  addTitle();
  
  // get a color scale mapping platform names to colors
  const colorScale = getColorScale(dataset);
  
  // create the root node
  const root = d3.hierarchy(dataset)
      .sum(d => d.value ? d.value : 0);
  
  // create the treemap
  const treemap = d3.treemap()
      .size([PLOT_WIDTH, PLOT_HEIGHT]);
  
  // get array of all leaf nodes
  const nodes = treemap(root).leaves();
  
  // create the SVG canvas
  d3.select('body')
    .append('div')
      .attr('id', 'svg-div')
    .append('svg')
      .attr('viewBox', `0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`);
  
  // bind data and plot the treemap tile groups
  d3.select('svg')
    .append('g')
      .attr('id', 'treemap')
      .attr('transform', `translate(${PADDING_LEFT}, ${PADDING_TOP})`)
    .selectAll('.tile-group')
    .data(nodes)
    .enter()
    .append('g')
      .attr('transform', d => `translate(${d.x0}, ${d.y0})`)
      .attr('class', 'tile-group');
  
  // plot the treemap tiles
  d3.selectAll('.tile-group')
    .append('rect')
      .attr('width', d => d.x1 - d.x0)
      .attr('height', d => d.y1 - d.y0)
      .attr('fill', d => colorScale(d.data.category))
      .attr('data-name', d => d.data.name)
      .attr('data-category', d => d.data.category)
      .attr('data-value', d => d.data.value)
      .attr('class', 'tile');
  
  // plot the treemap tile labels
  d3.selectAll('.tile-group')
    .append('text')
    .selectAll('tspan')
    .data(d => d.data.name.match(/[A-Z]+[^A-Z]*/g))
    .enter()
    .append('tspan')
      .attr('x', '0.3em')
      .attr('dy', '1em')
      .attr('class', 'tile-label')
      .text(d => d);
  
  // plot the legend
  plotLegend(colorScale);
  
  // add the tooltip and highlight overlay
  addTooltip(colorScale);
};

/*
 * Get the data and plot it.
 */

const URL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json";

document.addEventListener('DOMContentLoaded', () => {
  d3.json(URL).then(json => plotTreemap(json));
});
