/*
 * freeCodeCamp JavaScript Algorithms and Data Structures Certification
 * Project 2: Roman Numeral Converter
 * Alex Kozlov, 2019
 *
 * Converts the given decimal number into a Roman Numeral.
 */

"use strict";

import convertToRoman from './utils/convertToRoman';

window.convertToRoman = convertToRoman;

/***  Usage Examples  ***/

function printConvertToRoman(decimal) {
  console.log(`convertToRoman(${decimal}); // ` + convertToRoman(decimal));
}

printConvertToRoman(1);
printConvertToRoman(2);
printConvertToRoman(3);
printConvertToRoman(29);
printConvertToRoman(97);
printConvertToRoman(649);
printConvertToRoman(891);
printConvertToRoman(1023);
printConvertToRoman(2014);
printConvertToRoman(3999);
