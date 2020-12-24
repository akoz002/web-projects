
import { select } from 'd3-selection';
import { map } from 'd3-collection';
import { scaleQuantize } from 'd3-scale';
import { schemeOranges } from 'd3-scale-chromatic';
import { geoPath } from 'd3-geo';
import { feature } from 'topojson';
import addTooltip from './addTooltip';
import addLegend from './addLegend';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from './params';

/*
 * Top level function to plot the choropleth map.
 */

const plotChoropleth = (eduDataset, countyDataset) => {
  // create the mapping from county ID to education level
  const eduMap = map();
  eduDataset.forEach(({
    fips, state, area_name, bachelorsOrHigher
  }) => {
    eduMap.set(fips, {
      state,
      area_name,
      bachelorsOrHigher
    });
  });

  // create the color scale
  // the domain is 10% - 90%, segment size is 10%
  const colorScale = scaleQuantize()
      .domain([10, 90])
      .range(schemeOranges[8]);

  // create the SVG canvas
  select('main#svg-container')
    .append('svg')
      .attr('viewBox', `0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`);

  // plot the choropleth with counties
  const counties = feature(
    countyDataset, countyDataset.objects.counties).features;
  const choroplethX = 95;
  const choroplethY = 250;

  select('svg')
    .append('g')
      .attr('id', 'choropleth')
      .attr('transform', `translate(${choroplethX}, ${choroplethY}) scale(1.5)`)
    .selectAll('.county')
    .data(counties)
    .enter()
    .append('path')
      .attr('d', geoPath())
      .attr('class', 'county')
      .attr('data-fips', d => d.id)
      .attr('data-education', d => {
        if (eduMap.has(d.id)) {
          return eduMap.get(d.id).bachelorsOrHigher;
        }
        return 0;
      })
      .attr('fill', d => {
        if (eduMap.has(d.id)) {
          return colorScale(eduMap.get(d.id).bachelorsOrHigher);
        }
        return colorScale(0);
      });

  // plot the state borders
  const states = feature(
    countyDataset, countyDataset.objects.states).features;
  select('#choropleth')
    .selectAll('.state')
    .data(states)
    .enter()
    .append('path')
      .attr('d', geoPath())
      .attr('class', 'state');

  // add the legend
  addLegend(colorScale);

  // add tooltip and county overlay
  addTooltip(eduMap);
};

export default plotChoropleth;
