
/*
 * Mapping from Temperature to Hue in the HSL color model.
 */

export const TEMP_HUE_MAPPING = {
  12: 20,
  11: 40,
  10: 60,
  9: 80,
  8: 100,
  7: 120,
  6: 140,
  5: 160,
  4: 180,
  3: 200,
  2: 220
};

/*
 * Gets HSL Hue from temperature value.
 */

export const getHue = dataTemp => {
  // get all temperature values (keys) in reverse order
  // from largest to smallest
  const temps = Object.keys(TEMP_HUE_MAPPING).reverse();

  for (let i in temps) {
    const temp = Number(temps[i]);
    if (dataTemp >= temp) {
      return TEMP_HUE_MAPPING[temp];
    }
  }

  // data temperature is lower than the smallest value
  // return the last (smallest) temperature color
  return TEMP_HUE_MAPPING[temps[temps.length - 1]];
};

/*
 * Gets cell color from temperature value.
 */

export const getCellColor = temp => `hsl(${getHue(temp)}, 100%, 50%)`;

/*
 * Gets tooltip color from temperature value.
 */

export const getTooltipColor = temp => `hsl(${getHue(temp)}, 100%, 85%)`;
