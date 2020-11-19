
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

function printPalindrome(str) {
  console.log(`palindrome(${str}); // ` + palindrome(str));
}

console.log('Palindromes:');
printPalindrome("eye"); // true
printPalindrome("racecar"); // true
printPalindrome("RaceCar"); // true
printPalindrome("race CAR"); // true
printPalindrome("2A3*3a2"); // true
printPalindrome("2A3 3a2"); // true
printPalindrome("2_A3*3#A2"); // true

console.log('\nNon-palindromes:');
printPalindrome("blizzard"); // false
printPalindrome("fireball"); // false
printPalindrome("wind"); // false
printPalindrome("ice"); // false
printPalindrome("no"); // false
