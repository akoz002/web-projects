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

import {
  orbitalPeriod,
  orbitalPeriodHours,
  orbitalPeriodDays
} from './utils/orbitalPeriod';

window.orbitalPeriod = orbitalPeriod;
window.orbitalPeriodHours = orbitalPeriodHours;
window.orbitalPeriodDays = orbitalPeriodDays;

/***  Usage Examples  ***/

console.log('orbitalPeriod([{ name : "sputnik", avgAlt : 35873.5553 }])');
console.log(' * Returns * ');
console.log(orbitalPeriod([{ name : "sputnik", avgAlt : 35873.5553 }]));
console.log('------------------------------------------');

console.log('orbitalPeriod([\n' +
  '  { name: "iss", avgAlt: 413.6 },\n' +
  '  { name: "hubble", avgAlt: 556.7 },\n' +
  '  { name: "moon", avgAlt: 378632.553 }\n' +
  '])');
console.log(' * Returns * ');
console.log(orbitalPeriod([
  { name: "iss", avgAlt: 413.6 },
  { name: "hubble", avgAlt: 556.7 },
  { name: "moon", avgAlt: 378632.553 }
]));
console.log('------------------------------------------');

console.log('orbitalPeriodHours([{ name : "sputnik", avgAlt : 35873.5553 }])');
console.log(' * Returns * ');
console.log(orbitalPeriodHours([{ name : "sputnik", avgAlt : 35873.5553 }]));
console.log('------------------------------------------');

console.log('orbitalPeriodDays([{ name: "moon", avgAlt: 378632.553 }])');
console.log(' * Returns * ');
console.log(orbitalPeriodDays([{ name: "moon", avgAlt: 378632.553 }]));
