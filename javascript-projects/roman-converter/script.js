/*
 * freeCodeCamp JavaScript Algorithms and Data Structures Certification
 * Project 2: Roman Numeral Converter
 * Alex Kozlov, 2019
 *
 * Converts the given decimal number into a Roman Numeral.
 */

"use strict";

/*
 * Define a data structure to contain the Roman symbols
 */

const M = { symbol: "M", next: null, value: 1000 };
const D = { symbol: "D", next: M, value: 500 };
const C = { symbol: "C", next: D, value: 100 };
const L = { symbol: "L", next: C, value: 50 };
const X = { symbol: "X", next: L, value: 10 };
const V = { symbol: "V", next: X, value: 5 };
const I = { symbol: "I", next: V, value: 1 };
const ROMAN_SYMBOLS = {
  1: I, 
  10: X, 
  100: C,
  1000: M };

/*
 * Get a Roman Numeral for a value in a specific order of magnitude.
 * @param {number} orderOfMag One of the following:
 *   1000: get Roman Numeral in [1000 - 3000]
 *   100: get Roman Numeral in [100 - 900]
 *   10: get Roman Numeral in [10 - 90]
 *   1: get Roman Numeral in [1 - 9]
 * @param {number} value The value for which to get the Numeral.
 * @return {string} The Roman Numeral string.
 */
function _convertToRomanInOrderOfMag(orderOfMag, value) {
  // minSymbol is one of I(1) / X(10) / C(100) / M(1000)
  const minSymbol = ROMAN_SYMBOLS[orderOfMag];

  let currentSymbol = minSymbol;
  let romanStr = "";
  let diff = value;

  if (value >= minSymbol.value * 5) {
    /* 
     * The value is over the halfway point in the range
     * i.e. >= 5, 50, or 500 
     */
    currentSymbol = minSymbol.next;
    romanStr = currentSymbol.symbol;
    diff = value - currentSymbol.value;
  }

  if (diff <= minSymbol.value * 3) {
    /*
     * The value is within 3 steps, so we append the required
     * number of up to three I(1) / X(10) / C(100) / M(1000) symbols
     */
    const repeats = diff / minSymbol.value;
    return romanStr + minSymbol.symbol.repeat(repeats);
  }

  return minSymbol.symbol + currentSymbol.next.symbol;
}

/* Get a Roman Numeral for a given order of magnitude of the input number.
 * @param {number} orderOfMag One of the following:
 *   1000: get Roman Numeral in [1000 - 3000]
 *   100: get Roman Numeral in [100 - 900]
 *   10: get Roman Numeral in [10 - 90]
 *   1: get Roman Numeral in [1 - 9]
 * @param {number} num The value to process.
 * @return {string} Roman Numeral for a part of the number.
 */
function _getRomanNumerals(orderOfMag, num) {
  if (num / orderOfMag >= 1) {
    // the order of magnitude exists in this number
    // extract the order of magnitude component
    const component = num - (num % orderOfMag);
    return _convertToRomanInOrderOfMag(orderOfMag, component);
  }

  return "";
}

/*
 * Converts the given decimal number into a Roman Numeral.
 * @param {number} num A positive integer in the range [1 - 3999]
 * @return {string} A string representing the Roman Numeral.
 */
function convertToRoman(num) {
  let romanStr = "";
  let value = num;
  // split 'num' into its "order of magnitude" components
  for (let orderOfMag = 1000; orderOfMag >= 1; orderOfMag /= 10) {
    romanStr += _getRomanNumerals(orderOfMag, value);
    // the value is set to the remainder
    value %= orderOfMag;
  }

  return romanStr;
}

/***  Usage Examples  ***/

console.log(convertToRoman(1));
console.log(convertToRoman(2));
console.log(convertToRoman(3));
console.log(convertToRoman(29));
console.log(convertToRoman(97));
console.log(convertToRoman(649));
console.log(convertToRoman(891));
console.log(convertToRoman(1023));
console.log(convertToRoman(2014));
console.log(convertToRoman(3999));