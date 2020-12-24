
import { select } from 'd3-selection';
import { scalePoint } from 'd3-scale';
import { range } from 'd3-array';
import { axisBottom } from 'd3-axis';

/*
 * Adds a legend.
 */

const addLegend = colorScale => {
  const legendX = 560;
  const legendY = 135;
  const legendWidth = 500;
  const legendHeight = 50;

  // legend x scale
  const legendScale = scalePoint()
      .domain(range(10, 100, 10))
      .range([legendX, legendX + legendWidth]);

  select('svg')
    .append('g')
      .attr('id', 'legend')
    .selectAll('rect')
    .data(range(10, 90, 10))
    .enter()
    .append('rect')
      .attr('x', d => legendScale(d))
      .attr('y', legendY)
      .attr('width', legendScale.step())
      .attr('height', legendHeight)
      .attr('fill', d => colorScale(d));

  // legend x axis
  const legendAxis = axisBottom(legendScale)
      .tickPadding(10)
      .tickSizeOuter(0)
      .tickValues(range(20, 90, 10));

  select('#legend')
    .append('g')
      .attr('id', 'legend-axis')
      .attr('transform', `translate(0, ${legendY + legendHeight})`)
      .call(legendAxis);

  // legend description
  select('#legend')
    .append('text')
      .attr('id', 'description')
      .attr('x', legendX * 0.7)
      .attr('y', legendY * 0.4)
    .append('tspan')
      .text('Percentage of adults 25 years or older with a ' +
            'bachelor\'s degree or higher');

  select('#description')
    .append('tspan')
      .attr('x', legendX + legendWidth * 0.35)
      .attr('dy', '2em')
      .text('2010 - 2014');
};

export default addLegend;
