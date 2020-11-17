
/*
 * freeCodeCamp JavaScript Algorithms and Data Structures Certification
 * Project 1: Palindrome Checker
 * Alex Kozlov, 2019
 *
 * A palindrome is a word or sentence that's spelled the same way both
 * forward and backward, ignoring punctuation, case and spacing.
 *
 * The input string must be filtered to remove all non-alphanumeric
 * characters (punctuation, spaces and symbols). The palindrome check
 * must be case-insensitive.
 *
 * Example input strings include:
 *   "racecar", "RaceCar", "race CAR"
 *   "2A3*3a2", "2A3 3a2", "2_A3*3#A2"
 */

"use strict";

import palindrome from './utils/palindrome';

window.palindrome = palindrome;

/***  Usage Examples  ***/

console.log('palindrome("eye") => ' + palindrome("eye")); // true

console.log('palindrome("racecar") => ' + palindrome("racecar")); // true
console.log('palindrome("RaceCar") => ' + palindrome("RaceCar")); // true
console.log('palindrome("race CAR") => ' + palindrome("race CAR")); // true

console.log('palindrome("2A3*3a2") => ' + palindrome("2A3*3a2")); // true
console.log('palindrome("2A3 3a2") => ' + palindrome("2A3 3a2")); // true
console.log('palindrome("2_A3*3#A2") => ' + palindrome("2_A3*3#A2")); // true

console.log('\n');
console.log('palindrome("blizzard") => ' + palindrome("blizzard")); // false
console.log('palindrome("fireball") => ' + palindrome("fireball")); // false
console.log('palindrome("wind") => ' + palindrome("wind")); // false
console.log('palindrome("ice") => ' + palindrome("ice")); // false
console.log('palindrome("no") => ' + palindrome("no")); // false
