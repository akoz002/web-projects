/*
 * JavaScript Orbital Period Calculation
 * Alex Kozlov, 2019
 *
 * The orbital period is the time a give astronomical object
 * takes to complete one orbit around another object.
 * 
 * For a small body orbiting a central body in a circular or
 * elliptic orbit, the orbital period T (in seconds) is:
 *
 * T = 2 * PI * sqrt(a^3 / GM)
 *
 * where:
 *   a = the orbit's semi-major axis
 *   GM = product of:
 *     G = gravitational constant
 *     M = mass of the larger body
 *
 * In this application the body being orbited is the Earth.
 *
 * Ref: https://en.wikipedia.org/wiki/Orbital_period
 */

"use strict";

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
function orbitalPeriod(arr) {
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
function orbitalPeriodHours(arr) {
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
function orbitalPeriodDays(arr) {
  const orbitalPeriods = orbitalPeriod(arr);
  // mutate orbitalPeriods
  // this is fine since it's a local function variable
  orbitalPeriods.forEach(obj => {
    obj.orbitalPeriodDays = Math.round(obj.orbitalPeriod / 60 / 60 / 24);
    delete obj.orbitalPeriod;
  });
  return orbitalPeriods;
}

/***  Usage Examples  ***/

console.log(orbitalPeriod([
  {name : "sputnik", avgAlt : 35873.5553}]));
/* Prints: [ { name: 'sputnik', orbitalPeriod: 86400 } ] */

console.log(orbitalPeriod([
  {name: "iss", avgAlt: 413.6}, 
  {name: "hubble", avgAlt: 556.7}, 
  {name: "moon", avgAlt: 378632.553}]));
/* Prints: [
     { name: 'iss', orbitalPeriod: 5557 },
     { name: 'hubble', orbitalPeriod: 5734 },
     { name: 'moon', orbitalPeriod: 2377399 }] */

console.log(orbitalPeriodHours([
  {name : "sputnik", avgAlt : 35873.5553}]));
/* Prints: [ { name: 'sputnik', orbitalPeriodHours: 24 } ] */

console.log(orbitalPeriodDays([
  {name: "moon", avgAlt: 378632.553}]));
/* Prints: [ { name: 'moon', orbitalPeriodDays: 28 } ] */