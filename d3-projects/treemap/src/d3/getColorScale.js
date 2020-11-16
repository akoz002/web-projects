
import { scaleOrdinal } from 'd3-scale';
import { schemeSet3, schemePastel2 } from 'd3-scale-chromatic';

/*
 * Gets a discrete color scale mapping platform names to colors.
 */

const getColorScale = dataset => {
  // the domain is the platform names
  const domain = dataset.children.map(platform => platform.name);

  // manually construct a discrete scale of 18 colors
  const colorsDiscrete = scaleOrdinal()
      .domain(domain)
      .range(schemeSet3.concat([
        schemePastel2[7],
        schemePastel2[6],
        'mintcream',
        'lavender',
        'lightcyan',
        'lightgreen'
      ]));

  return colorsDiscrete;
};

export default getColorScale;
