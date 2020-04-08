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

/*
 * Global parameters.
 */

const CANVAS_WIDTH = 1600;
const CANVAS_HEIGHT = 900;

/*
 * Adds a title.
 */

const addTitle = () => {
  d3.select('body')
    .append('h1')
      .attr('id', 'title')
      .text('U.S. Educational Level');
};

/*
 * Adds a legend.
 */

const addLegend = colorScale => {
  const legendX = CANVAS_WIDTH * 0.35;
  const legendY = CANVAS_HEIGHT * 0.15;
  const legendWidth = 500;
  const legendHeight = 50;
  
  // legend x scale
  const legendScale = d3.scalePoint()
      .domain(d3.range(10, 100, 10))
      .range([legendX, legendX + legendWidth]);
  
  d3.select('svg')
    .append('g')
      .attr('id', 'legend')
    .selectAll('rect')
    .data(d3.range(10, 90, 10))
    .enter()
    .append('rect')
      .attr('x', d => legendScale(d))
      .attr('y', legendY)
      .attr('width', legendScale.step())
      .attr('height', legendHeight)
      .attr('fill', d => colorScale(d));
  
  // legend x axis
  const legendAxis = d3.axisBottom(legendScale)
      .tickPadding(10)
      .tickSizeOuter(0)
      .tickValues(d3.range(20, 90, 10));
  
  d3.select('#legend')
    .append('g')
      .attr('id', 'legend-axis')
      .attr('transform', `translate(0, ${legendY + legendHeight})`)
      .call(legendAxis);
  
  // legend description
  d3.select('#legend')
    .append('text')
      .attr('id', 'description')
      .attr('x', legendX * 0.7)
      .attr('y', legendY * 0.4)
    .append('tspan')
      .text('Percentage of adults 25 years or older with a ' +
            'bachelor\'s degree or higher');
  
  d3.select('#description')
    .append('tspan')
      .attr('x', legendX + legendWidth * 0.35)
      .attr('dy', '2em')
      .text('2010 - 2014');
};

/*
 * Adds a tooltip and county overlay.
 */

const addTooltip = eduMap => {
  // the tooltip container
  d3.select('#svg-div')
    .append('div')
      .attr('id', 'tooltip')
      .style('opacity', 0);
  
  // the overlay for highlighting selected county
  d3.select('#choropleth')
    .append('path')
      .attr('id', 'overlay')
      .style('opacity', 0);
  
  // add mouseover event handlers for county plots
  d3.selectAll('.county')
      .on('mouseover', (d, i, nodes) => {
        const path = nodes[i];
        const pathData = path.attributes.d.value;
        const dataID = path.attributes['data-fips'].value;
        const {state, area_name, bachelorsOrHigher} =
              eduMap.get(dataID);
    
        // position the tooltip
        const mousePos = d3.mouse(d3.select('svg').node());
        const tooltipX = (mousePos[0] / CANVAS_WIDTH * 100) + 3;
        const tooltipY = (mousePos[1] / CANVAS_HEIGHT * 100) - 13;
    
        d3.select('#tooltip')
            .attr('data-education', bachelorsOrHigher)
            .style('left', `${tooltipX}%`)
            .style('top', `${tooltipY}%`)
            .html(`${area_name}, ${state}<br>` +
                  `${bachelorsOrHigher} %`)
          .transition()
            .duration(200)
            .style('opacity', 0.95);
    
        // position the overlay
        d3.select('#overlay')
            .attr('d', pathData)
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
 * Top level function to plot the choropleth map.
 */

const plotChoropleth = (eduDataset, countyDataset) => {
  // add title
  addTitle();
  
  // create the mapping from county ID to education level
  const eduMap = d3.map();
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
  const colorScale = d3.scaleQuantize()
      .domain([10, 90])
      .range(d3.schemeOranges[8]);
  
  // create the SVG canvas
  d3.select('body')
    .append('div')
      .attr('id', 'svg-div')
    .append('svg')
      .attr('viewBox', `0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`);
  
  // plot the choropleth with counties
  const counties = topojson.feature(
    countyDataset, countyDataset.objects.counties).features;
  const choroplethX = CANVAS_WIDTH * 0.23;
  const choroplethY = CANVAS_HEIGHT * 0.3;
  
  d3.select('svg')
    .append('g')
      .attr('id', 'choropleth')
      .attr('transform', `translate(${choroplethX}, ${choroplethY})`)
    .selectAll('.county')
    .data(counties)
    .enter()
    .append('path')
      .attr('d', d3.geoPath())
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
  const states = topojson.feature(
    countyDataset, countyDataset.objects.states).features;
  d3.select('#choropleth')
    .selectAll('.state')
    .data(states)
    .enter()
    .append('path')
      .attr('d', d3.geoPath())
      .attr('class', 'state');
  
  // add the legend
  addLegend(colorScale);
  
  // add tooltip and county overlay
  addTooltip(eduMap);

};

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
