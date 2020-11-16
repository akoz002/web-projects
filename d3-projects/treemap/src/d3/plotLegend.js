
import { select, selectAll } from 'd3-selection';
import { CANVAS_WIDTH } from './params';

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
  select('svg')
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
  select('#legend')
    .selectAll('.legend-cell')
    .data(legendData)
    .enter()
    .append('g')
      .attr('transform', d => `translate(${d.x}, ${d.y})`)
      .attr('class', 'legend-cell');

  // plot the legend tiles
  selectAll('.legend-cell')
    .append('rect')
      .attr('width', tileSize)
      .attr('height', tileSize)
      .attr('class', 'legend-item')
      .attr('fill', d => colorScale(d.platform));

  // plot the legend labels
  selectAll('.legend-cell')
    .append('text')
      .attr('x', tileSize * 1.3)
      .attr('y', tileSize * 0.8)
      .attr('class', 'legend-label')
      .text(d => '- ' + d.platform);
};

export default plotLegend;
