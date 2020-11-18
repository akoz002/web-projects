
/*
 * Calculate the orbital period of ojects around the Earth in seconds.
 * @param {Array<object>} arr An array of objects in the format:
 *   {name: 'name', avgAlt: avgAlt}
 * avgAlt is the object's average altitude in kilometers
 * @return {Array<object>} An array of objects in the format:
 *   {name: 'name', orbitalPeriod: T}
 * T is the orbital period in seconds, rounded to the nearest
 * whole number
 */

export function orbitalPeriod(arr) {
  const GM = 398600.4418;
  const EARTH_RADIUS = 6367.4447; // kilometers

  return arr.map(obj => {
    const a = EARTH_RADIUS + obj.avgAlt;
    const T = 2 * Math.PI * Math.sqrt(Math.pow(a, 3) / GM);
    return { name: obj.name, orbitalPeriod: Math.round(T) };
  });
}

/*
 * Calculate the orbital period of ojects around the Earth in hours.
 * @param {Array<object>} arr An array of objects in the format:
 *   {name: 'name', avgAlt: avgAlt}
 * avgAlt is the object's average altitude in kilometers
 * @return {Array<object>} An array of objects in the format:
 *   {name: 'name', orbitalPeriodHours: T}
 * T is the orbital period in hours, rounded to the nearest
 * whole number
 */

export function orbitalPeriodHours(arr) {
  const orbitalPeriods = orbitalPeriod(arr);
  // mutate orbitalPeriods
  // this is fine since it's a local function variable
  // i.e. we aren't mutating the function argument "arr"
  // (could have instead implemented it in a non-mutating
  // way as with map() above)
  orbitalPeriods.forEach(obj => {
    obj.orbitalPeriodHours = Math.round(obj.orbitalPeriod / 60 / 60);
    delete obj.orbitalPeriod;
  });
  return orbitalPeriods;
}

/*
 * Calculate the orbital period of ojects around the Earth in days.
 * @param {Array<object>} arr An array of objects in the format:
 *   {name: 'name', avgAlt: avgAlt}
 * avgAlt is the object's average altitude in kilometers
 * @return {Array<object>} An array of objects in the format:
 *   {name: 'name', orbitalPeriodDays: T}
 * T is the orbital period in days, rounded to the nearest
 * whole number
 */

export function orbitalPeriodDays(arr) {
  const orbitalPeriods = orbitalPeriod(arr);
  // mutate orbitalPeriods
  // this is fine since it's a local function variable
  orbitalPeriods.forEach(obj => {
    obj.orbitalPeriodDays = Math.round(obj.orbitalPeriod / 60 / 60 / 24);
    delete obj.orbitalPeriod;
  });
  return orbitalPeriods;
}
